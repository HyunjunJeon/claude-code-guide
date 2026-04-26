# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Codex How To is a tutorial repository for Codex features. This is **documentation-as-code** — the primary output is markdown files organized into numbered learning modules, not an executable application.

**Architecture**: Each module (01-10) covers a specific Codex feature with copy-paste templates, Mermaid diagrams, and examples. The build system validates documentation quality and generates EPUB ebooks in two languages (English, Korean).

## Common Commands

### Pre-commit Quality Checks

All documentation must pass quality checks before commits (run automatically via pre-commit hooks):

```bash
pre-commit install          # Install hooks (one-time)
pre-commit run --all-files  # Run all checks manually
```

The checks include:
1. **markdown-lint** — Structure and formatting via `markdownlint` (config: `.markdownlint.json`, uses `default: false` — only explicitly enabled rules)
2. **cross-references** — Internal links, anchors, code fence language tags
3. **mermaid-syntax** — Validates all Mermaid diagrams parse correctly
4. **link-check** — External URLs are reachable
5. **build-epub** — EPUB generates without errors (on `.md` changes)
6. **ruff / bandit / mypy** — Python lint, security, and type checks (scoped to `scripts/`)

Korean (`ko/`) content has parallel hooks that run the same checks on its directory.

### Development Environment Setup

```bash
pip install uv                                  # Install uv (Python package manager)
uv venv && source .venv/bin/activate            # Create and activate venv
uv pip install -r scripts/requirements-dev.txt  # Install Python deps
npm install -g markdownlint-cli                 # Markdown linter
npm install -g @mermaid-js/mermaid-cli          # Mermaid diagram renderer (mmdc)
uv pip install pre-commit && pre-commit install # Pre-commit hooks
```

Requires Python >=3.10 (CI tests against 3.10, 3.11, 3.12).

### Testing

```bash
pytest scripts/tests/ -v                                  # Run all tests
pytest scripts/tests/ -v --cov=scripts --cov-report=html  # With coverage
pytest scripts/tests/test_build_epub.py -v                # Single test file
```

### Code Quality

```bash
ruff check scripts/                                            # Lint Python
ruff format scripts/                                           # Format Python
bandit -c scripts/pyproject.toml -r scripts/ --exclude scripts/tests/  # Security
mypy scripts/ --ignore-missing-imports                         # Type check
```

### EPUB Build

```bash
uv run scripts/build_epub.py                    # Build English EPUB
uv run scripts/build_epub.py --lang ko          # Build Korean EPUB
uv run scripts/build_epub.py --verbose          # Verbose output
```

Mermaid diagrams are rendered locally via `mmdc` (the Mermaid CLI) — no network required. The `mmdc` binary must be installed globally (`npm install -g @mermaid-js/mermaid-cli`).

In CI, pass `--puppeteer-config` with a no-sandbox config for headless Chromium.

### Translation Sync

```bash
python scripts/sync_translations.py            # Check which translations are outdated
python scripts/sync_translations.py --verbose  # Detailed comparison
```

Compares modification times between English source files and `ko/` translations.

## Content Guidelines

### Module Structure
Each numbered folder (01-10) follows the pattern:
- **README.md** — Overview of the feature with examples
- **Example files** — Copy-paste templates (`.md` for commands, `.json` for configs, `.sh` for hooks)

### Mermaid Diagrams
- All diagrams must parse successfully (checked by pre-commit hook)
- Use Mermaid for flowcharts, sequence diagrams, and architecture visuals

### Cross-References
- Use relative paths for internal links (e.g., `(01-slash-commands/README.md)`)
- Code fences must specify language (e.g., ` ```bash `, ` ```python `)
- Anchor links use `#heading-name` format

## Key Architecture Points

1. **Numbered folders indicate learning order** — The 01-10 prefix represents the recommended sequence. Do not reorganize alphabetically.

2. **Two-language architecture** — English content lives at root (`01-*/`), Korean translation mirrors the same structure under `ko/`. Korean has its own pre-commit hooks and EPUB build. When modifying English content, run `sync_translations.py` to identify outdated translations.

3. **Scripts are utilities, not the product** — Python scripts in `scripts/` support documentation quality and EPUB generation. The actual content is in the numbered module folders.

4. **Pre-commit is the gatekeeper** — All quality checks must pass before a PR is accepted. CI workflows (`docs-check.yml`, `test.yml`) run the same checks as a second pass.

5. **EPUB output** — The build system generates `Codex-guide.epub` (English) and `Codex-guide-ko.epub` (Korean).

6. **This is a tutorial, not a library** — Focus on clear explanations, copy-paste examples, and visual diagrams. The value is in teaching concepts, not providing reusable code.

## Commit Conventions

Follow conventional commit format with folder-name scopes:
- `feat(slash-commands): Add API documentation generator`
- `docs(memory): Improve personal preferences example`
- `fix(README): Correct table of contents link`
- `refactor(hooks): Simplify hook configuration examples`
