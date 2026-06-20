<div align="center">

<img src="assets/codinfy-brand/ICON.png" alt="Codix Build" width="96" />

# `@codinfy/codix-build-mcp`

### Construisez plus vite avec des agents IA — Codix Build MCP

Créez **sites web, applications mobiles, SaaS, scripts et logiciels plus vite** avec des agents IA tout en **réduisant la consommation de tokens** via le Smart Context Mode. Compatible Claude Code, Codex, Cursor, Continue, Cline, Windsurf.

[![npm version](https://img.shields.io/npm/v/@codinfy/codix-build-mcp.svg?color=FF7900)](https://www.npmjs.com/package/@codinfy/codix-build-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-34BB78.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-339933?logo=node.js&logoColor=white)](https://nodejs.org)

**📦 [npm](https://www.npmjs.com/package/@codinfy/codix-build-mcp) · 🌐 [codinfy.com](https://codinfy.com) · 📚 [docs.codinfy.com/codix-build-mcp](https://docs.codinfy.com/codix-build-mcp) · 🛡️ [Sécurité](SECURITY.md)**

[🇬🇧 English](README.md) · **🇫🇷 Français**

</div>

---

## Statut

**v0.1.0** — 16 outils locaux `codix.*`, Smart Context Mode, templates, prompt packs, skill packs, exemples clients et docs. Docs : [`docs.codinfy.com/codix-build-mcp`](https://docs.codinfy.com/codix-build-mcp).

## Pourquoi Codix Build MCP ?

Quand vous demandez à un agent IA de « construire un SaaS Laravel avec licences, paiements et dashboard mobile-first », vous finissez généralement par : coller des centaines de lignes d'architecture à chaque prompt ; brûler des tokens à réexpliquer la stack ; obtenir du code incohérent entre modules ; perdre le contexte en passant de Cursor à Claude Code à Codex.

Codix Build MCP résout ces 4 problèmes via un petit jeu d'outils MCP qui **analysent** un brief, **recommandent** templates/prompt packs, **injectent le contexte efficacement** (Smart Context Mode) et **génèrent** des scaffolds (Laravel, Next.js, Flutter, WordPress, SaaS, Marketplace, API) avec licence, design et déploiement câblés.

## Installation

```bash
npm install -g @codinfy/codix-build-mcp
# ou
npx -y @codinfy/codix-build-mcp
```

### Claude Code / Claude Desktop — `~/.claude/mcp.json`

```json
{ "mcpServers": { "codix-build": { "command": "npx", "args": ["-y", "@codinfy/codix-build-mcp"] } } }
```

Autres clients (Cursor, Codex, Continue, Windsurf) : [`examples/`](examples).

## Outils (16)

**Analyser & planifier** — `codix.project.analyze` · `codix.stack.recommend` · `codix.architecture.get` · `codix.context.smart`
**Générer** — `codix.prompt.generate` · `codix.template.get` · `codix.license.inject` · `codix.design.apply` · `codix.api.generate` · `codix.database.schema`
**Qualité & ops** — `codix.security.checklist` · `codix.marketplace.check` · `codix.docs.generate` · `codix.deploy.guide` · `codix.debug.help` · `codix.cost.optimize`

Schémas, paramètres et exemples : [`docs/`](docs).

## Projets compagnons

| Repo | Rôle | Licence |
|---|---|---|
| [`codinfy-mcp`](https://github.com/bakalagoin/codinfy-mcp) | MCP public pour appeler les API Codinfy | MIT |
| [`codix-build-mcp`](https://github.com/bakalagoin/codix-build-mcp) (celui-ci) | Construire n'importe quel projet plus vite | MIT |
| `codinfy-mcp-internal` | MCP privé de l'équipe Codinfy | propriétaire |

## 🌍 Suivez-nous

| Réseau | Codinfy | Bakala Goin (Fondateur & CEO) |
|---|---|---|
| **Facebook** | [@codinfyci](https://facebook.com/codinfyci) | [@bakalagoin](https://facebook.com/bakalagoin) |
| **Instagram** | [@codinfyci](https://instagram.com/codinfyci) | [@bakalagoin](https://instagram.com/bakalagoin) |
| **LinkedIn** | [company/codinfyen](https://linkedin.com/company/codinfyen/) | [bakala-goin](https://www.linkedin.com/in/bakala-goin-66428b247) |
| **TikTok** | — | [@bakalagoin](https://www.tiktok.com/@bakalagoin) |
| **X (Twitter)** | — | [@bakalagoin](https://twitter.com/bakalagoin) |

## Licence

[MIT](LICENSE) © 2026 **RAFLOX SAS** — Abidjan, Côte d'Ivoire.

---

<div align="center">

**Codinfy** — par **RAFLOX SAS** · 📧 [contact@codinfy.com](mailto:contact@codinfy.com) · 🌐 [codinfy.com](https://codinfy.com)

</div>
