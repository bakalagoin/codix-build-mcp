# Security Policy

## Reporting a vulnerability

Email **security@codinfy.com** privately. Do not open public GitHub issues for security reports.

Include:

- a description of the issue and its impact;
- reproduction steps;
- the version of `@codinfy/codix-build-mcp` you tested;
- your name / handle for credit (optional).

We acknowledge within **2 business days** and aim to patch high-severity issues within **30 days**.

## Scope

In scope: this repository, the npm package `@codinfy/codix-build-mcp`, documentation at `docs.codinfy.com/codix-build-mcp`.

Out of scope: the Codinfy platform itself (report via `codinfy.com/security`), other Codinfy MCPs, third-party dependencies (report upstream).

## Hardening for users

- Never commit `CODIX_BUILD_API_KEY` to source control.
- Pin a version in your MCP client config (e.g. `npx -y @codinfy/codix-build-mcp@0.1.0`).
- Treat templates pulled by `codix.template.get` like any other third-party code: review before running.

## License

Reports and patches accepted under the [MIT License](LICENSE).
