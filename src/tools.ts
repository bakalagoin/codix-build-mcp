import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import {
  analyzeProject,
  apiPlan,
  costOptimize,
  databaseSchema,
  debugHelp,
  deployGuide,
  designSystem,
  docsOutline,
  generatePrompt,
  getArchitecture,
  getTemplate,
  licenseInstructions,
  marketplaceCheck,
  recommendStack,
  securityChecklist,
  selectContext,
} from "./engine.js";

type ToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

function ok(data: unknown): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify({ data }, null, 2) }] };
}

function fail(error: unknown): ToolResult {
  const message = error instanceof Error ? error.message : String(error);
  return { content: [{ type: "text", text: message }], isError: true };
}

const projectType = z.enum([
  "landing",
  "website",
  "saas",
  "marketplace",
  "dashboard",
  "api",
  "mobile",
  "wordpress",
  "ecommerce",
  "crm",
  "license-system",
  "docs",
  "script",
]);

const stack = z.enum(["laravel-livewire", "nextjs", "flutter", "wordpress", "node-api", "fastapi", "static"]);
const hosting = z.enum(["cpanel", "vps", "docker", "vercel", "render", "railway", "cloudflare-pages", "firebase", "supabase", "mobile-stores"]);
const template = z.enum(["laravel-livewire", "nextjs", "flutter", "wordpress", "node-api", "fastapi", "static", "saas", "marketplace", "api", "docs"]);

export const TOOL_NAMES = [
  "codix.project.analyze",
  "codix.stack.recommend",
  "codix.prompt.generate",
  "codix.architecture.get",
  "codix.template.get",
  "codix.license.inject",
  "codix.design.apply",
  "codix.api.generate",
  "codix.database.schema",
  "codix.security.checklist",
  "codix.marketplace.check",
  "codix.docs.generate",
  "codix.deploy.guide",
  "codix.debug.help",
  "codix.cost.optimize",
  "codix.context.smart",
] as const;

export function registerTools(server: McpServer): void {
  server.registerTool(
    "codix.project.analyze",
    {
      description: "Analyze a short project brief into type, modules, risks, milestones and Smart Context chunks.",
      inputSchema: {
        brief: z.string().min(10).max(4000),
        constraints: z.array(z.string().min(1).max(300)).optional(),
        mustHave: z.array(z.string().min(1).max(200)).optional(),
      },
    },
    async (input) => {
      try {
        return ok(analyzeProject(input));
      } catch (error) {
        return fail(error);
      }
    },
  );

  server.registerTool(
    "codix.stack.recommend",
    {
      description: "Recommend a stack from project type, budget, team level and hosting target.",
      inputSchema: {
        projectType: projectType.optional(),
        hosting: z.union([hosting, z.literal("unknown")]).optional(),
        budget: z.enum(["low", "medium", "high"]).optional(),
        teamLevel: z.enum(["beginner", "intermediate", "senior"]).optional(),
      },
    },
    async (input) => ok(recommendStack(input)),
  );

  server.registerTool(
    "codix.prompt.generate",
    {
      description: "Generate a compact agent prompt using Smart Context Mode instead of long pasted docs.",
      inputSchema: {
        brief: z.string().min(10).max(6000),
        targetAgent: z.enum(["codex", "claude-code", "cursor", "windsurf", "generic"]).optional(),
        output: z.enum(["plan", "implementation", "review", "handoff"]).optional(),
        maxTokens: z.number().int().min(250).max(4000).optional(),
      },
    },
    async (input) => ok(generatePrompt(input)),
  );

  server.registerTool(
    "codix.architecture.get",
    {
      description: "Return the canonical architecture layers and build order for a project type and stack.",
      inputSchema: { projectType, stack },
    },
    async (input) => ok(getArchitecture(input)),
  );

  server.registerTool(
    "codix.template.get",
    {
      description: "Return a project template file tree, commands and notes for Laravel, Next.js, Flutter, WordPress, API, docs and more.",
      inputSchema: { id: template },
    },
    async ({ id }) => ok(getTemplate(id)),
  );

  server.registerTool(
    "codix.license.inject",
    {
      description: "Generate Codinfy-compatible license integration instructions without hardcoding secrets.",
      inputSchema: {
        stack,
        productType: z.string().max(100).optional(),
        offlineGraceHours: z.number().int().min(0).max(720).optional(),
      },
    },
    async (input) => ok(licenseInstructions(input)),
  );

  server.registerTool(
    "codix.design.apply",
    {
      description: "Apply a pragmatic design system: tokens, components and app-like mobile UX rules.",
      inputSchema: {
        platform: z.string().max(80).optional(),
        brandName: z.string().max(120).optional(),
        primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
      },
    },
    async (input) => ok(designSystem(input)),
  );

  server.registerTool(
    "codix.api.generate",
    {
      description: "Generate API route/controller/service/validation/test plan from resources.",
      inputSchema: {
        resources: z.array(z.string().min(2).max(80)).default([]),
        auth: z.enum(["none", "session", "api-key", "oauth"]).optional(),
        style: z.enum(["rest", "graphql"]).optional(),
      },
    },
    async (input) => ok(apiPlan(input)),
  );

  server.registerTool(
    "codix.database.schema",
    {
      description: "Generate database schema guidance: migrations, relations and seeders.",
      inputSchema: {
        entities: z.array(z.string().min(2).max(80)).default([]),
        database: z.enum(["mysql", "postgresql", "sqlite", "mongodb"]).optional(),
      },
    },
    async (input) => ok(databaseSchema(input)),
  );

  server.registerTool(
    "codix.security.checklist",
    {
      description: "Return a security checklist for stack, features and compliance needs.",
      inputSchema: {
        stack: stack.optional(),
        features: z.array(z.enum(["payments", "ads", "licenses", "oauth", "admin", "api"])).optional(),
        compliance: z.array(z.string().min(2).max(120)).optional(),
      },
    },
    async (input) => ok(securityChecklist(input)),
  );

  server.registerTool(
    "codix.marketplace.check",
    {
      description: "Check readiness for Codinfy Store / CodeCanyon packaging.",
      inputSchema: {
        target: z.enum(["codinfy-store", "codecanyon", "both"]).optional(),
        projectType: projectType.optional(),
        hasLicense: z.boolean().optional(),
        hasDocs: z.boolean().optional(),
        hasTests: z.boolean().optional(),
      },
    },
    async (input) => ok(marketplaceCheck(input)),
  );

  server.registerTool(
    "codix.docs.generate",
    {
      description: "Generate documentation outline and starter snippets.",
      inputSchema: {
        projectName: z.string().min(2).max(120),
        projectType: projectType.optional(),
        sections: z.array(z.string().min(2).max(100)).optional(),
      },
    },
    async (input) => ok(docsOutline(input)),
  );

  server.registerTool(
    "codix.deploy.guide",
    {
      description: "Generate deployment steps for cPanel, VPS, Docker, Vercel, Render, Railway, Cloudflare Pages, Firebase, Supabase or app stores.",
      inputSchema: { target: hosting, stack: stack.optional() },
    },
    async (input) => ok(deployGuide(input)),
  );

  server.registerTool(
    "codix.debug.help",
    {
      description: "Map an error message to likely causes and verification commands.",
      inputSchema: {
        stack: stack.optional(),
        error: z.string().min(3).max(4000),
        environment: z.string().max(120).optional(),
      },
    },
    async (input) => ok(debugHelp(input)),
  );

  server.registerTool(
    "codix.cost.optimize",
    {
      description: "Suggest prompt-token and infrastructure cost optimizations.",
      inputSchema: {
        prompt: z.string().max(8000).optional(),
        stack: stack.optional(),
        budget: z.enum(["low", "medium", "high"]).optional(),
      },
    },
    async (input) => ok(costOptimize(input)),
  );

  server.registerTool(
    "codix.context.smart",
    {
      description: "Smart Context Mode: return only the context chunks needed for the active task.",
      inputSchema: {
        brief: z.string().min(3).max(4000),
        activeTask: z.string().max(200).optional(),
        stack: z.string().max(100).optional(),
        include: z.array(z.string().max(100)).optional(),
      },
    },
    async (input) => ok({ chunks: selectContext(input) }),
  );
}
