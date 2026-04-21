# TypeScript v2 Preview

The TypeScript v2 preview documents the next iteration of the TypeScript SDK surface. Treat it as a migration target, not a stability guarantee.

## When To Read It

Read the preview docs when:

- you are starting a new integration and want the upcoming shape,
- you need features that land there first,
- you are planning a migration from the current TypeScript package.

## How To Use Preview Docs Safely

- verify the exact package and version before adopting preview APIs,
- keep preview usage behind an internal compatibility layer,
- expect names and behavior to move before general availability,
- do not build critical production paths around unstable assumptions without a fallback.

## Practical Advice

If you already have a stable TypeScript integration, prefer the current GA path unless the preview solves a real problem you have today.

## Related Links

- [TypeScript](./typescript.md)
- [Migration Guide](./migration-guide.md)
- Official guide: https://code.claude.com/docs/ko/agent-sdk/typescript-v2-preview
