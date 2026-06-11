# Codix Build MCP - Getting Started

Codix Build MCP gives AI coding agents short, targeted context for building websites, SaaS apps, dashboards, APIs, mobile apps, templates and marketplace-ready products.

## Install

```bash
npm install -g @codinfy/codix-build-mcp
codix-build-mcp
```

Or use it without installing:

```bash
npx -y @codinfy/codix-build-mcp
```

## Client configs

Use the files in `examples/` for Claude Code, Codex, Cursor, Continue, Windsurf and GitHub Copilot-compatible MCP clients.

## First prompt

Ask your agent:

```text
Use codix.project.analyze on this brief, then codix.context.smart before writing code:
Build a Laravel SaaS marketplace with licenses, mobile money checkout and admin dashboard.
```

The MCP returns compact, local guidance. It does not call Codinfy internal APIs and does not require secrets.
