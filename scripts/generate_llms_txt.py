#!/usr/bin/env -S uv run --script
# /// script
# dependencies = []
# ///
"""
Generate llms.txt for AI agent consumption.

Reads Korean markdown modules and produces a structured index file
following the llms.txt standard (https://llmstxt.org/).

Usage:
    uv run scripts/generate_llms_txt.py
    uv run scripts/generate_llms_txt.py --output template/public/llms.txt
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

MODULE_DIRS = [
    "01-slash-commands",
    "02-memory",
    "03-skills",
    "04-subagents",
    "05-mcp",
    "06-hooks",
    "07-plugins",
    "08-checkpoints",
    "09-advanced-features",
    "10-cli",
]

SITE_URL = "https://claude-code-guide.vercel.app"


def extract_title(content: str) -> str:
    match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    return match.group(1).strip() if match else ""


def extract_description(content: str) -> str:
    lines = content.split("\n")
    found_h1 = False
    desc = ""
    for line in lines:
        if not found_h1 and line.startswith("# "):
            found_h1 = True
            continue
        if found_h1:
            stripped = line.strip()
            if not stripped:
                if desc:
                    break
                continue
            if stripped.startswith("#") or stripped.startswith("```"):
                break
            desc += (" " if desc else "") + stripped
    return desc[:200]


def get_subpages(module_dir: Path) -> list[tuple[str, str]]:
    if not module_dir.is_dir():
        return []
    pages = []
    for f in sorted(module_dir.iterdir()):
        if (
            f.suffix == ".md"
            and f.name != "README.md"
            and not f.name.startswith("_")
            and not f.name.startswith(".")
        ):
            content = f.read_text(encoding="utf-8")
            title = extract_title(content) or f.stem
            pages.append((f.stem, title))
    return pages


def generate_llms_txt(root: Path, site_url: str) -> str:
    ko_dir = root / "ko"
    if not ko_dir.is_dir():
        print(f"Error: Korean content directory not found: {ko_dir}", file=sys.stderr)
        sys.exit(1)

    lines: list[str] = []

    # Header
    lines.append("# Claude Code 가이드북")
    lines.append("")
    lines.append(
        "> Slash Commands부터 MCP, Hooks, Plugins까지 — "
        "Claude Code의 핵심 기능을 단계별로 학습하는 가이드입니다."
    )
    lines.append("")

    # Modules section
    lines.append("## Modules")
    lines.append("")

    for mod_dir_name in MODULE_DIRS:
        mod_path = ko_dir / mod_dir_name
        readme_path = mod_path / "README.md"

        if not readme_path.is_file():
            continue

        content = readme_path.read_text(encoding="utf-8")
        title = extract_title(content) or mod_dir_name
        description = extract_description(content)
        url = f"{site_url}/modules/{mod_dir_name}"

        desc_suffix = f": {description}" if description else ""
        lines.append(f"- [{title}]({url}){desc_suffix}")

        # Subpages
        for slug, sub_title in get_subpages(mod_path):
            sub_url = f"{site_url}/modules/{mod_dir_name}/{slug}"
            lines.append(f"  - [{sub_title}]({sub_url})")

    lines.append("")

    # Optional sections
    lines.append("## Links")
    lines.append("")
    lines.append(
        f"- [GitHub Repository](https://github.com/HyunjunJeon/claude-code-guide-book)"
    )
    lines.append(f"- [Full Site]({site_url})")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent

    parser = argparse.ArgumentParser(description="Generate llms.txt")
    parser.add_argument(
        "--output",
        "-o",
        type=str,
        default=str(repo_root / "template" / "public" / "llms.txt"),
        help="Output file path (default: template/public/llms.txt)",
    )
    parser.add_argument(
        "--site-url",
        type=str,
        default=SITE_URL,
        help=f"Site base URL (default: {SITE_URL})",
    )
    args = parser.parse_args()

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    content = generate_llms_txt(repo_root, args.site_url.rstrip("/"))
    output_path.write_text(content, encoding="utf-8")

    print(f"Generated {output_path} ({len(content)} bytes)")


if __name__ == "__main__":
    main()
