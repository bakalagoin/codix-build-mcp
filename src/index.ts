#!/usr/bin/env node
/**
 * @codinfy/codix-build-mcp - public Codix Build MCP (AGENT-46).
 *
 * 16 local deterministic tools for project planning, stack selection,
 * templates, license/design/API/database/docs/deploy guidance and Smart
 * Context Mode. The package exposes no internal Codinfy secrets and does not
 * fake external APIs; it only returns build guidance and starter structures.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadConfig, PACKAGE_NAME, PACKAGE_VERSION } from "./config.js";
import { registerTools, TOOL_NAMES } from "./tools.js";

export function buildServer(env: NodeJS.ProcessEnv = process.env): McpServer {
  loadConfig(env);

  const server = new McpServer({ name: PACKAGE_NAME, version: PACKAGE_VERSION });
  registerTools(server);

  return server;
}

async function main(): Promise<void> {
  const config = loadConfig();
  const server = buildServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(
    `[${PACKAGE_NAME}] v${PACKAGE_VERSION} ready on stdio (${config.mode} mode, ${TOOL_NAMES.length} tools).`,
  );
}

const entry = process.argv[1]?.replace(/\\/g, "/");
if (entry && import.meta.url.endsWith(entry.split("/").pop() ?? "")) {
  main().catch((error: unknown) => {
    console.error(`[${PACKAGE_NAME}] Fatal:`, error);
    process.exit(1);
  });
}
