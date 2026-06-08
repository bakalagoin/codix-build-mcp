# `@codinfy/codix-build-mcp` — Codix Build MCP

> Official **Codix Build MCP** by Codinfy.
> Build websites, mobile apps, SaaS, scripts, and software **faster** with AI agents while **reducing token usage** via Smart Context Mode.

[![npm version](https://img.shields.io/npm/v/@codinfy/codix-build-mcp.svg)](https://www.npmjs.com/package/@codinfy/codix-build-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Status

> 🚧 **v0.1.0 — scaffold.** Full tools, templates, prompt packs and skill packs land in AGENT-46.
> Track progress at [`docs.codinfy.com/codix-build-mcp`](https://docs.codinfy.com/codix-build-mcp).

---

## Why Codix Build MCP?

When you ask an AI agent to "build a Laravel SaaS with licences, payments and a mobile-first dashboard", you usually end up:

1. pasting hundreds of lines of architecture guidance into every prompt;
2. burning tokens re-explaining the same stack decisions to every new agent;
3. ending up with inconsistent code across modules;
4. struggling to switch from Cursor → Claude Code → Codex without losing context.

Codix Build MCP fixes all four problems by exposing a small set of MCP tools that:

- **Analyse** a project description and pick a sensible stack.
- **Recommend** templates, prompt packs and skill packs that match your goal.
- **Inject context efficiently** (Smart Context Mode) so you never pay for tokens twice.
- **Generate** scaffolds (Laravel, Next.js, Flutter, WordPress, SaaS, Marketplace, API) with license, design, and deployment helpers wired in.

It is built and maintained by the Codinfy team, the same team that ships [`@codinfy/mcp`](https://github.com/bakalagoin/codinfy-mcp) (Codinfy public API MCP).

---

## Install

```bash
npm install -g @codinfy/codix-build-mcp
# or
npx -y @codinfy/codix-build-mcp
```

## Configure your agent

### Claude Code / Claude Desktop

`~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "codix-build": {
      "command": "npx",
      "args": ["-y", "@codinfy/codix-build-mcp"]
    }
  }
}
```

### Cursor / Codex / Continue / Cline / Windsurf

See [`docs.codinfy.com/codix-build-mcp/clients`](https://docs.codinfy.com/codix-build-mcp).

### Authenticated mode (optional, for higher quotas)

Add an API key from [`codinfy.com/admin/parametres/api-s`](https://codinfy.com):

```json
"env": { "CODIX_BUILD_API_KEY": "pk_live_xxxxxxxxxxxxxxxxx" }
```

Without a key, the MCP runs in public mode with conservative rate limits.

---

## Tools (16 — implemented in AGENT-46)

### Analyse & plan
- `codix.project.analyze` — turn a short brief into a structured project spec
- `codix.stack.recommend` — pick a stack from your constraints (hosting, budget, team)
- `codix.architecture.get` — fetch the canonical architecture for a stack
- `codix.context.smart` — Smart Context Mode (only sends the chunks the agent actually needs)

### Generate
- `codix.prompt.generate` — turn the project spec into prompt packs for any agent
- `codix.template.get` — fetch a project template (Laravel, Next.js, Flutter, etc.)
- `codix.license.inject` — wire a license validation client (Codinfy or generic)
- `codix.design.apply` — apply a design token system (Tailwind 4 `@theme`, brand palette)
- `codix.api.generate` — REST or GraphQL spec from the project model
- `codix.database.schema` — migrations + seeders for MariaDB/MySQL/PostgreSQL

### Quality & ops
- `codix.security.checklist` — OWASP top 10 + secrets + auth review
- `codix.marketplace.check` — readiness check for CodeCanyon / Codinfy marketplace
- `codix.docs.generate` — README + CONTRIBUTING + DEPLOYMENT in one shot
- `codix.deploy.guide` — cPanel, Vercel, Render, Fly.io, Cloudflare Pages, or bare VPS
- `codix.debug.help` — interactive debugging hints for the current stack
- `codix.cost.optimize` — flag expensive patterns (token-burning prompts, N+1, fat assets)

> Schemas, parameters, examples and changelogs live in [`docs.codinfy.com/codix-build-mcp`](https://docs.codinfy.com/codix-build-mcp).

---

## What ships in the package

```
codix-build-mcp/
├── src/
│   ├── index.ts              # MCP server bootstrap
│   ├── tools/                # one file per tool, all re-exported
│   ├── context/              # Smart Context Mode (chunkers, retrievers)
│   └── types/                # shared Zod schemas
├── templates/                # project templates
│   ├── laravel/
│   ├── nextjs/
│   ├── flutter/
│   ├── wordpress/
│   ├── saas/
│   ├── marketplace/
│   └── api/
├── prompt-packs/             # reusable prompt packs
│   ├── token-saver/
│   ├── license/
│   ├── marketplace/
│   ├── cpanel/
│   └── deploy/
├── skill-packs/              # markdown skill briefings
│   ├── architecture/
│   ├── security/
│   ├── docs/
│   └── business-kit/
├── examples/                 # MCP-client configs
│   ├── claude-code.json
│   ├── codex.json
│   ├── cursor.json
│   └── windsurf.json
├── package.json
├── tsconfig.json
└── .github/workflows/        # ci.yml + publish-npm.yml
```

---

## Companion projects

| Repo | Purpose | License |
|---|---|---|
| [`codinfy-mcp`](https://github.com/bakalagoin/codinfy-mcp) | Public MCP to call Codinfy APIs (licenses, payments, brand) | MIT |
| [`codix-build-mcp`](https://github.com/bakalagoin/codix-build-mcp) (this) | Build any project faster, with Smart Context Mode | MIT |
| `codinfy-mcp-internal` | Private MCP for the Codinfy team | proprietary |

---

## Releases

Pushing a tag `v*` to `main` publishes to npm automatically.

```bash
npm version patch
git push --follow-tags
```

---

## Security

Report vulnerabilities privately to **security@codinfy.com**. See [`SECURITY.md`](SECURITY.md).

## Contributing

Issues and PRs welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 RAFLOX SAS — Abidjan, Côte d'Ivoire.
