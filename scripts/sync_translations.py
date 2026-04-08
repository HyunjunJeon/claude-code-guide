#!/usr/bin/env python3
"""
Detect outdated Korean translations compared to English version.

This script compares modification times between English and Korean
documentation files to identify which translations need updating.

Usage:
    python scripts/sync_translations.py
    python scripts/sync_translations.py --verbose
"""

import argparse
from datetime import datetime
from pathlib import Path


def check_translation_status(
    root_path: Path | None = None, verbose: bool = False
) -> tuple[list[dict], list[dict]]:
    """
    Compare modification times between English and Korean files.

    Args:
        root_path: Root directory of the repository (default: script parent parent)
        verbose: Print detailed information

    Returns:
        List of outdated files with metadata
    """
    if root_path is None:
        root_path = Path(__file__).parent.parent

    # Get all English markdown files (excluding ko/ directory)
    en_files = [
        f
        for f in root_path.rglob("*.md")
        if "ko/" not in str(f) and ".claude" not in str(f)
    ]

    # Get all Korean markdown files
    ko_dir = root_path / "ko"
    ko_files = list(ko_dir.rglob("*.md")) if ko_dir.exists() else []

    # Build modification time mapping
    en_mtime = {f: f.stat().st_mtime for f in en_files}
    ko_mtime = {f: f.stat().st_mtime for f in ko_files}

    outdated = []
    not_translated = []

    for en_file, en_time in sorted(en_mtime.items()):
        # Find corresponding Korean file
        try:
            rel_path = en_file.relative_to(root_path)
        except ValueError:
            # File is not relative to root (shouldn't happen)
            if verbose:
                print(f"  Skipping non-relative file: {en_file}")
            continue

        ko_file = root_path / "ko" / rel_path

        if ko_file in ko_mtime:
            ko_time = ko_mtime[ko_file]
            if en_time > ko_time:
                outdated.append(
                    {
                        "file": rel_path,
                        "en_mtime": datetime.fromtimestamp(en_time),
                        "ko_mtime": datetime.fromtimestamp(ko_time),
                        "days_diff": (en_time - ko_time) / 86400,  # Convert to days
                    }
                )
        else:
            not_translated.append(
                {
                    "file": rel_path,
                    "status": "NOT_TRANSLATED",
                }
            )

    # Sort outdated by days difference (most outdated first)
    outdated.sort(key=lambda x: x["days_diff"], reverse=True)

    return outdated, not_translated


def format_outdated_table(outdated: list[dict]) -> str:
    """Format outdated files as a Markdown table."""
    if not outdated:
        return "All translations are up to date.\n"

    table = "### Outdated Translations (Need Update)\n\n"
    table += "| File | Last EN Update | Last KO Update | Days Behind |\n"
    table += "|------|----------------|----------------|-------------|\n"

    for item in outdated:
        file_path = str(item["file"])
        en_date = item["en_mtime"].strftime("%Y-%m-%d")
        ko_date = item["ko_mtime"].strftime("%Y-%m-%d")
        days = int(item["days_diff"])

        # Truncate long paths for display
        if len(file_path) > 50:
            file_path = "..." + file_path[-47:]

        table += f"| `{file_path}` | {en_date} | {ko_date} | **{days} days** |\n"

    return table


def format_not_translated_table(not_translated: list[dict]) -> str:
    """Format not translated files as a Markdown table."""
    if not not_translated:
        return "\nAll files have been translated.\n"

    table = "\n### Not Translated Yet\n\n"
    table += "| File | Status |\n"
    table += "|------|--------|\n"

    for item in not_translated:
        file_path = str(item["file"])

        # Truncate long paths for display
        if len(file_path) > 60:
            file_path = "..." + file_path[-57:]

        table += f"| `{file_path}` | **Not translated** |\n"

    return table


def format_summary(outdated: list[dict], not_translated: list[dict]) -> str:
    """Format summary statistics."""
    total_outdated = len(outdated)
    total_not_translated = len(not_translated)
    total_files = total_outdated + total_not_translated

    summary = "## Summary\n\n"
    summary += f"- **Total files needing attention:** {total_files}\n"
    summary += f"- **Outdated translations:** {total_outdated}\n"
    summary += f"- **Not translated yet:** {total_not_translated}\n"

    if total_outdated > 0:
        most_outdated = max(outdated, key=lambda x: x["days_diff"])
        summary += f"- **Most outdated file:** {most_outdated['file']} ({int(most_outdated['days_diff'])} days behind)\n"

    summary += "\n---\n\n"

    return summary


def main():
    parser = argparse.ArgumentParser(
        description="Check Korean translation status against English version"
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Print detailed information"
    )
    parser.add_argument(
        "--root",
        "-r",
        type=Path,
        default=None,
        help="Root directory of repository (default: auto-detect)",
    )

    args = parser.parse_args()

    # Detect root path if not provided
    root_path = args.root or Path(__file__).parent.parent

    if args.verbose:
        print(f"Checking translations in: {root_path}")
        print()

    # Check translation status
    outdated, not_translated = check_translation_status(root_path, args.verbose)

    # Print summary to console
    print("=" * 60)
    print("Korean Translation Status Report")
    print("=" * 60)
    print()

    total_outdated = len(outdated)
    total_not_translated = len(not_translated)

    if total_outdated == 0 and total_not_translated == 0:
        print("All files are up to date.")
        print()
        return

    print(
        f"Found {total_outdated} outdated + {total_not_translated} not translated files"
    )
    print()

    if args.verbose and outdated:
        print("OUTDATED FILES (need update):")
        print("-" * 60)
        for i, item in enumerate(outdated, 1):
            print(f"{i}. {item['file']}")
            print(f"   EN: {item['en_mtime'].strftime('%Y-%m-%d %H:%M')}")
            print(f"   KO: {item['ko_mtime'].strftime('%Y-%m-%d %H:%M')}")
            print(f"   Behind by: {int(item['days_diff'])} days")
            print()

    if args.verbose and not_translated:
        print("NOT TRANSLATED FILES:")
        print("-" * 60)
        for i, item in enumerate(not_translated[:20], 1):  # Limit to 20
            print(f"{i}. {item['file']}")

        if len(not_translated) > 20:
            print(f"... and {len(not_translated) - 20} more files")
        print()

    # Print Markdown-formatted report
    print("=" * 60)
    print("Markdown Report")
    print("=" * 60)
    print()

    report = format_summary(outdated, not_translated)
    report += format_outdated_table(outdated)
    report += format_not_translated_table(not_translated)

    print(report)


if __name__ == "__main__":
    main()
