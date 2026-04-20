"""Migrate <picture> dark-mode blocks to MkDocs Material image syntax.

Converts:
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="path/to/dark.svg">
      <img alt="Alt Text" src="path/to/light.svg">
    </picture>

To:
    ![Alt Text](path/to/light.svg#only-light)
    ![Alt Text](path/to/dark.svg#only-dark)

Skips <picture> blocks that appear inside fenced code blocks.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# Directories to exclude from processing
EXCLUDED_DIRS = {".omc", ".omx", ".claude", "scripts", "node_modules", "_site", "content"}

# Regex to match a complete <picture> block (multiline, non-greedy)
PICTURE_BLOCK_RE = re.compile(
    r"<picture>\s*"
    r'<source\s+media="\(prefers-color-scheme:\s*dark\)"\s+srcset="([^"]+)"\s*>\s*'
    r'<img\s+alt="([^"]*)"\s+src="([^"]+)"\s*/?>\s*'
    r"</picture>",
    re.IGNORECASE,
)


def is_excluded(path: Path, root: Path) -> bool:
    """Return True if any component of path (relative to root) is in EXCLUDED_DIRS."""
    try:
        rel = path.relative_to(root)
    except ValueError:
        return False
    return bool(set(rel.parts) & EXCLUDED_DIRS)


def split_into_segments(text: str) -> list[tuple[bool, str]]:
    """Split text into (inside_fence, chunk) segments.

    Returns a list of (is_code_fence, text) tuples so callers can skip
    replacements inside fenced blocks.
    """
    segments: list[tuple[bool, str]] = []
    # Match opening fences: ``` or ~~~ optionally followed by a language tag
    fence_re = re.compile(r"^(`{3,}|~{3,})[^\n]*$", re.MULTILINE)

    pos = 0
    inside = False
    fence_char = ""
    fence_len = 0

    for m in fence_re.finditer(text):
        marker = m.group(1)
        if not inside:
            # Opening fence — emit the plain segment before it
            segments.append((False, text[pos : m.start()]))
            # Start of fenced region (include the fence line itself)
            inside = True
            fence_char = marker[0]
            fence_len = len(marker)
            pos = m.start()
        else:
            # Potential closing fence — must match opening fence type and length
            if marker[0] == fence_char and len(marker) >= fence_len:
                end = m.end()
                segments.append((True, text[pos:end]))
                inside = False
                fence_char = ""
                fence_len = 0
                pos = end

    # Remainder
    segments.append((inside, text[pos:]))
    return segments


def migrate_text(text: str) -> tuple[str, int]:
    """Replace <picture> blocks outside code fences with Material syntax.

    Returns (new_text, replacement_count).
    """
    segments = split_into_segments(text)
    count = 0
    parts: list[str] = []

    for is_fence, chunk in segments:
        if is_fence:
            parts.append(chunk)
            continue

        def replace(m: re.Match) -> str:  # noqa: E306
            nonlocal count
            dark_src = m.group(1)
            alt = m.group(2)
            light_src = m.group(3)
            count += 1
            return (
                f"![{alt}]({light_src}#only-light)\n"
                f"![{alt}]({dark_src}#only-dark)"
            )

        parts.append(PICTURE_BLOCK_RE.sub(replace, chunk))

    return "".join(parts), count


def find_markdown_files(root: Path) -> list[Path]:
    """Recursively find .md files under root, excluding EXCLUDED_DIRS."""
    return [
        p
        for p in root.rglob("*.md")
        if not is_excluded(p, root)
    ]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Migrate <picture> dark-mode blocks to MkDocs Material syntax."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview changes without modifying files.",
    )
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Project root directory (default: current directory).",
    )
    args = parser.parse_args(argv)

    root = Path(args.root).resolve()
    if not root.is_dir():
        print(f"ERROR: {root} is not a directory", file=sys.stderr)
        return 1

    files = find_markdown_files(root)
    files_modified = 0
    total_replacements = 0

    for path in sorted(files):
        original = path.read_text(encoding="utf-8")
        new_text, count = migrate_text(original)

        if count == 0:
            continue

        rel = path.relative_to(root)
        print(f"{'[dry-run] ' if args.dry_run else ''}  {rel}: {count} replacement(s)")

        if args.dry_run:
            # Show a compact diff preview
            orig_lines = original.splitlines()
            new_lines = new_text.splitlines()
            for i, (o, n) in enumerate(zip(orig_lines, new_lines), start=1):
                if o != n:
                    print(f"    line {i}: - {o.rstrip()}")
                    print(f"    line {i}: + {n.rstrip()}")
            # Handle lines that only exist in new_text (replacements that expand line count)
            if len(new_lines) > len(orig_lines):
                for j in range(len(orig_lines), len(new_lines)):
                    print(f"    line {j + 1}: + {new_lines[j].rstrip()}")
        else:
            path.write_text(new_text, encoding="utf-8")

        files_modified += 1
        total_replacements += count

    mode = "Would modify" if args.dry_run else "Modified"
    print(f"\n{mode} {files_modified} file(s) with {total_replacements} total replacement(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
