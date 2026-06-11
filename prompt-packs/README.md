# Prompt packs

Reusable prompt packs served by `codix.prompt.generate`. Each subfolder is a coherent bundle of system prompts, user prompt skeletons, and few-shot examples optimised for a specific outcome.

| Folder | Goal |
|---|---|
| `token-saver/` | Compact prompts that get the job done in 30-60% fewer tokens |
| `license/` | Generate license clients, HMAC, JWT RS256, grace period |
| `marketplace/` | CodeCanyon / Codinfy marketplace readiness |
| `cpanel/` | Shared hosting constraints, no daemon, queue=database |
| `deploy/` | cPanel, Vercel, Render, Fly.io, Cloudflare Pages |

Each pack ships a versioned `pack.json` with compact prompt fragments that
agents can combine with `codix.context.smart`.
