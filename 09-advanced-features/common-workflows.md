# Common Workflows

This page condenses the official workflow guide into reusable patterns you can adapt quickly.

## Understand A New Codebase

Start broad, then narrow.

Typical prompts:

```text
give me an overview of this codebase
explain the main architecture patterns used here
what are the key data models?
how is authentication handled?
```

Useful follow-ups:

- ask for project conventions
- ask for a glossary of project-specific terms
- ask Claude to trace a specific user flow end to end

## Find Relevant Code

Use domain language and ask for structure, not just filenames.

```text
find the files that handle user authentication
how do these authentication files work together?
trace the login process from front-end to database
```

If available, code intelligence plugins make this much more precise.

## Fix Bugs Efficiently

Give Claude the reproducer, not just the symptom.

```text
I'm seeing an error when I run npm test
suggest a few ways to fix the @ts-ignore in user.ts
update user.ts to add the null check you suggested
```

Best practice:

- include the failing command
- include the stack trace
- say whether the bug is intermittent or consistent
- ask Claude to verify the fix after editing

## Refactor Safely

Refactoring works better when the scope and compatibility bar are explicit.

```text
find deprecated API usage in our codebase
suggest how to refactor utils.js to use modern JavaScript features
refactor utils.js to use ES2024 features while maintaining the same behavior
run tests for the refactored code
```

Prefer small, testable increments over one giant rewrite.

## Use Specialized Subagents

Subagents help when a side task would flood the main conversation.

Typical uses:

- security review
- test triage
- deep codebase exploration
- bounded implementation work

Start by checking `/agents`, then let Claude delegate or explicitly ask for a specialized worker.

## Use Plan Mode For Analysis

For risky changes, split the work into:

1. read and analyze
2. produce a plan
3. review the plan
4. implement

This is often better than jumping straight into edits.

## Work With Tests

Claude performs better when the verification path is explicit.

Ask it to:

- identify the failing tests
- explain the failure
- implement the smallest valid fix
- rerun only the relevant tests first
- rerun broader verification afterward

## Create Pull Requests

Useful PR-oriented tasks:

- summarize the diff
- write a commit message
- draft a PR description
- identify risky files and regressions
- propose a review checklist

Claude is strongest when you give it the intended change, acceptance criteria, and any release notes or migration constraints that matter.

## Handle Docs And Notes

Claude Code is not limited to source code. Use it for:

- docs rewrites
- changelog drafts
- runbook cleanup
- note synthesis
- repo-wide terminology consistency

## Use Non-Interactive Mode

The official docs also highlight CLI workflows such as:

- pipe in, pipe out
- structured output
- scheduled runs
- adding Claude to verification pipelines

Those belong in automation and CI paths where a one-shot run is more useful than an interactive session.

## Session And Worktree Patterns

For longer efforts:

- resume previous sessions when continuity matters
- name sessions so they are easy to find
- fork sessions when trying alternate approaches
- use Git worktrees for parallel Claude sessions with separate file trees

## Related Guides

- [Best Practices](./best-practices.md)
- [Planning Mode Examples](./planning-mode-examples.md)
- [Session and Interaction](./session-and-interaction.md)
- [Execution Modes](./execution-modes.md)

## Official Source

- [Common workflows](https://code.claude.com/docs/ko/common-workflows)
