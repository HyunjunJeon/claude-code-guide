# Network Configuration

This page documents the enterprise network controls Claude Code expects: proxy routing, outbound allowlists, TLS trust, custom certificates, and how to confirm the environment is actually working.

## What Must Be Reachable

At minimum, Claude Code needs access to:

- `api.anthropic.com` for Claude API traffic.
- `claude.ai` for Claude.ai account authentication.
- `platform.claude.com` for Claude Console authentication.

Depending on how you install or use Claude Code, you may also need:

- `storage.googleapis.com` for the native installer and auto-updater.
- `downloads.claude.ai` for install scripts, version pointers, manifests, signing keys, and plugin downloads.
- `bridge.claudeusercontent.com` for the Chrome integration WebSocket bridge.

If you use Claude Code on the web or Code Review with GitHub Enterprise Cloud, you may also need the GitHub IP allow-list inheritance behavior that Anthropic's docs call out.

## Proxy Configuration

Claude Code respects the standard proxy environment variables:

```bash
export HTTPS_PROXY=https://proxy.example.com:8080
export HTTP_PROXY=http://proxy.example.com:8080
export NO_PROXY="localhost 192.168.1.1 example.com .example.com"
```

Use `HTTPS_PROXY` whenever possible. `NO_PROXY` can be space-separated or comma-separated, and `*` disables proxying entirely. Claude Code does not support SOCKS proxies.

If your proxy uses basic auth, embed the credentials in the proxy URL:

```bash
export HTTPS_PROXY=http://username:password@proxy.example.com:8080
```

For NTLM, Kerberos, or other advanced proxy auth schemes, the docs recommend using an LLM gateway that matches your auth model.

## TLS And Certificates

Claude Code trusts both its bundled Mozilla CA set and the OS trust store by default. In many enterprise TLS-inspection setups, that is enough once the enterprise root certificate is installed in the OS trust store.

Useful controls:

```bash
export CLAUDE_CODE_CERT_STORE=bundled
export CLAUDE_CODE_CERT_STORE=system
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

Notes:

- `CLAUDE_CODE_CERT_STORE` can be set in the environment or in the `env` block of `settings.json`.
- `NODE_EXTRA_CA_CERTS` is the direct way to trust a custom CA when running on the Node.js runtime.
- If your enterprise requires client certificates, Claude Code supports mTLS through `CLAUDE_CODE_CLIENT_CERT`, `CLAUDE_CODE_CLIENT_KEY`, and `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE`.

## Practical Verification Commands

Start with environment inspection:

```bash
env | grep -E 'HTTP_PROXY|HTTPS_PROXY|NO_PROXY|CLAUDE_CODE_CERT_STORE|NODE_EXTRA_CA_CERTS|CLAUDE_CODE_CLIENT_CERT|CLAUDE_CODE_CLIENT_KEY'
```

Check the outbound endpoint directly:

```bash
curl -I https://api.anthropic.com
```

If you need to test through a proxy:

```bash
HTTPS_PROXY=https://proxy.example.com:8080 curl -I https://api.anthropic.com
```

For certificate debugging, use `openssl s_client` against the same host and compare the chain with your enterprise trust store.

Inside Claude Code, run:

```text
/status
```

That confirms which auth and managed settings sources are active and is a good way to detect when the client is not reaching the expected network path.

## Troubleshooting

- If login opens but never completes, check proxy auth and TLS inspection first.
- If updates or plugins fail, verify `storage.googleapis.com` and `downloads.claude.ai` are reachable.
- If Claude.ai login fails in a restricted environment, confirm `claude.ai` and `platform.claude.com` are allowlisted.
- If the app fails only in one shell, compare inherited environment variables between shells and session managers.

## Official Source Links

- [Enterprise network configuration](https://code.claude.com/docs/ko/corporate-proxy)
- [Authentication](https://code.claude.com/docs/ko/authentication)
- [Claude Code settings](https://code.claude.com/docs/ko/settings)
