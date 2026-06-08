#!/usr/bin/env node
/**
 * @codinfy/codix-build-mcp - Codix Build MCP (scaffold).
 *
 * Full tool implementations land in AGENT-46 of the Codinfy build plan.
 * Will register 16 tools under the `codix.*` namespace:
 *
 *   Analyse & plan
 *     codix.project.analyze
 *     codix.stack.recommend
 *     codix.architecture.get
 *     codix.context.smart
 *
 *   Generate
 *     codix.prompt.generate
 *     codix.template.get
 *     codix.license.inject
 *     codix.design.apply
 *     codix.api.generate
 *     codix.database.schema
 *
 *   Quality & ops
 *     codix.security.checklist
 *     codix.marketplace.check
 *     codix.docs.generate
 *     codix.deploy.guide
 *     codix.debug.help
 *     codix.cost.optimize
 *
 * Auth: optional CODIX_BUILD_API_KEY env var. Without it the MCP runs in
 * public mode with conservative rate limits.
 *
 * Smart Context Mode: see src/context/ - chunkers and retrievers send only
 * the slice the calling agent actually needs, dramatically lowering token
 * cost on long-running scaffolding sessions.
 *
 * Spec: https://docs.codinfy.com/codix-build-mcp
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const PACKAGE_NAME = "@codinfy/codix-build-mcp";
const PACKAGE_VERSION = "0.1.0";

async function main(): Promise<void> {
  const apiKey = process.env.CODIX_BUILD_API_KEY ?? "";

  const server = new Server(
    { name: PACKAGE_NAME, version: PACKAGE_VERSION },
    { capabilities: { tools: {} } },
  );

  // AGENT-46: register tools under codix.* namespace here.
  // server.setRequestHandler(...)
  void apiKey;

  const transport = new StdioServerTransport();
  await server.connect(transport);
  const mode = apiKey ? "authenticated" : "public";
  console.error(
    `[${PACKAGE_NAME}] v${PACKAGE_VERSION} ready on stdio (${mode} mode).`,
  );
}

main().catch((error: unknown) => {
  console.error(`[${PACKAGE_NAME}] Fatal:`, error);
  process.exit(1);
});
