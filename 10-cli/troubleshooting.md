# Troubleshooting

This page covers setup and environment problems. If you are seeing runtime API errors such as `API Error: 500`, `529 Overloaded`, `429`, or `Prompt is too long`, use the error reference instead.

## Installation Problems

### `claude` is not found after install

If `claude` is installed but your shell cannot find it, verify your `PATH` and the install location:

```bash
echo $PATH | tr ':' '\n' | grep local/bin
ls -la "$(which claude)"
```

On macOS and Linux, Claude Code is usually installed in `~/.local/bin`. Add that directory to your shell config if it is missing:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

On Windows PowerShell:

```powershell
echo $Env:Path -split ';' | Select-String local\\bin
```

### WSL install or Node errors

If you are installing on WSL and see OS detection or `exec: node: not found` problems, confirm that WSL is using Linux binaries:

```bash
which npm
which node
```

If those paths point into `/mnt/c/`, install Node inside WSL and try again. Official guidance also includes:

```bash
npm config set os linux
npm install -g @anthropic-ai/claude-code --force --no-os-check
```

Do not use `sudo npm install -g`.

### Permission or binary issues

If npm install completes but the binary still fails, use the native installer path or reinstall cleanly:

```bash
claude doctor
curl -fsSL https://claude.ai/install.sh | bash
```

If you are on macOS, Linux, or WSL and want the native binary route, the installer is the preferred fallback when npm permissions or optional dependencies get in the way.

## Authentication Problems

### Login keeps failing

The usual recovery path is:

```text
/logout
claude
```

Then complete login again. If the browser does not open automatically, press `c` at the prompt to copy the OAuth URL and open it manually.

### OAuth code issues

If you see an invalid-code error, the copied code was likely truncated or expired. Retry quickly after the browser opens. For remote or SSH sessions, open the copied URL in your local browser instead of the remote machine.

### `403 Forbidden` after login

If login succeeds but API calls are rejected, check whether:

- Your subscription is active.
- Your Console account has the `Claude Code` or `Developer` role.
- A corporate proxy is interfering with API traffic.

### Token expired or repeated re-logins

Run `/login` again. If the problem comes back, check your system clock and, on macOS, verify Keychain access:

```bash
security unlock-keychain ~/Library/Keychains/login.keychain-db
```

Run `claude doctor` if you suspect credential storage problems.

### Subscription overridden by an API key

If you have a paid Claude subscription but Claude Code behaves as if it is using a different org, check for `ANTHROPIC_API_KEY` in your shell profile and remove it if present. Then confirm the active auth method with `/status`.

## Network And Proxy Problems

### Installer or update cannot reach the download host

Test access to the download endpoint:

```bash
curl -sI https://storage.googleapis.com
```

If you are behind a proxy, export both proxy variables before launching Claude Code:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

### API connectivity problems

Test API reachability from the same shell:

```bash
curl -I https://api.anthropic.com
```

On Windows PowerShell, use `curl.exe` so the alias does not interfere:

```powershell
curl.exe -I https://api.anthropic.com
```

If TLS inspection is involved, point Node at your corporate CA bundle with `NODE_EXTRA_CA_CERTS`.

## Provider And Model Access

### Selected model is not available

If Claude says the selected model may not exist or you may not have access to it, check the model in this order:

1. The `--model` flag.
2. The `ANTHROPIC_MODEL` environment variable.
3. Your settings files.

Use `/model` to pick an available model, or switch to an alias like `sonnet` or `opus` so the reference stays current.

### Pro plan does not include the model you picked

If Opus is not available on your plan, switch to a supported model with `/model`. If you just upgraded, run `/logout` and `/login` so the session picks up the new entitlement.

### Organization disabled even though you have a subscription

This usually means a stale `ANTHROPIC_API_KEY` is overriding your subscription credentials. Remove the key from your shell and relaunch Claude Code.

## Quality And Search Issues

### Output quality suddenly feels worse

Check these in order:

- `/model` to confirm you are on the model you expect.
- `/effort` to confirm the reasoning level.
- `/context` to see whether the session is too full.
- `/compact` or `/clear` to reduce stale context.
- `/rewind` if the conversation drifted after a bad turn.

Large or outdated `CLAUDE.md` files and unused MCP servers can also crowd the context window.

### Search, `@file`, or skill discovery is unreliable

Install system `ripgrep` and disable the bundled one if needed:

```bash
brew install ripgrep
winget install BurntSushi.ripgrep.MSVC
sudo apt install ripgrep
```

Then set:

```bash
export USE_BUILTIN_RIPGREP=0
```

### Markdown generation problems

If Claude generates markdown without language tags or with awkward spacing, ask it to fix the file directly, or add a formatting hook. A good quick recovery is to rerun with a narrow prompt and then verify the rendered output.

## When To Escalate

Use `/doctor` to check installation type, settings, MCP configuration, keybindings, and other local issues. Use `/feedback` if the problem looks like a product bug. If the issue is regional or service-wide, check `status.claude.com`.

## Official Sources

- https://code.claude.com/docs/ko/troubleshooting
- https://code.claude.com/docs/ko/getting-started
- https://code.claude.com/docs/ko/settings
- https://code.claude.com/docs/ko/mcp
- https://code.claude.com/docs/ko/permissions
