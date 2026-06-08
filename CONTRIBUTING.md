# Contributing to `@codinfy/codix-build-mcp`

Thanks for your interest. This is the public Codix Build MCP. Issues and PRs are welcome from anyone.

## Quick start

```bash
git clone https://github.com/bakalagoin/codix-build-mcp.git
cd codix-build-mcp
npm install
cp .env.example .env
npm run build
npm test
```

## What we love

- New project templates that compile, install, and run on a clean machine.
- Prompt packs that demonstrably reduce token usage (include a before/after benchmark in the PR description).
- Skill packs that bundle a coherent body of conventions for a stack.
- Bug fixes and tests for existing tools.

## What we don't accept

- Templates that hard-code paid third-party services without a free fallback.
- Prompt packs that leak secrets, personal data, or proprietary Codinfy material.
- Marketplace placements, ads, or sponsorships.

## Code style

- TypeScript strict mode.
- ESLint + Prettier defaults (`npm run lint`).
- Validate MCP inputs with [Zod](https://zod.dev/).
- One tool per file under `src/tools/`, exported from `src/tools/index.ts`.

## Conventional commits

`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`.

## License

By contributing, you agree your work is released under the [MIT License](LICENSE).
