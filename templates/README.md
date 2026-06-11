# Templates

Project templates served by `codix.template.get`. Each subfolder is a complete, runnable project skeleton that an agent can pull on demand.

| Folder | Stack | Use case |
|---|---|---|
| `laravel/` | Laravel 13 + Livewire 4 + Tailwind CSS 4 | Codinfy-style monolith for cPanel-friendly SaaS |
| `nextjs/` | Next.js + Tailwind + tRPC | App Router SaaS / dashboards |
| `flutter/` | Flutter (mobile) | iOS / Android client apps |
| `wordpress/` | WordPress + Bedrock | Themes and plugins |
| `saas/` | Generic SaaS scaffold | Multi-tenant, subscriptions, RBAC |
| `marketplace/` | Marketplace scaffold | Vendor portal + buyer portal + payouts |
| `api/` | API-only (Fastify / Hono / FastAPI) | Headless services |

Each template ships:

- a minimal compilable skeleton;
- a `codix.config.json` describing variables to substitute;
- a `README.md` for humans;
- a `SETUP.md` for agents (machine-readable steps).

AGENT-46 ships template briefs instead of huge generated apps. The MCP returns
the right brief on demand, then the coding agent applies it in the target repo.
