import { describe, expect, it } from "vitest";

import {
  analyzeProject,
  apiPlan,
  contextLibrary,
  costOptimize,
  databaseSchema,
  debugHelp,
  deployGuide,
  generatePrompt,
  getTemplate,
  marketplaceCheck,
  recommendStack,
  securityChecklist,
  selectContext,
} from "../src/engine.js";
import { TOOL_NAMES } from "../src/tools.js";

describe("Codix Build tools", () => {
  it("registers the 16 public AGENT-46 tool names", () => {
    expect(TOOL_NAMES).toHaveLength(16);
    expect(TOOL_NAMES).toContain("codix.project.analyze");
    expect(TOOL_NAMES).toContain("codix.context.smart");
  });

  it("analyzes a SaaS marketplace brief and selects only relevant smart context", () => {
    const result = analyzeProject({
      brief: "Build a Laravel SaaS marketplace with license activation, mobile money checkout and app-like mobile dashboard.",
    });

    expect(result.type).toBe("saas");
    expect(result.modules).toEqual(expect.arrayContaining(["payments", "licenses", "marketplace", "pwa-mobile-ux"]));
    expect(result.smartContext).toEqual(expect.arrayContaining(["laravel", "licensing", "payments"]));
  });

  it("recommends Laravel Livewire for shared hosting SaaS", () => {
    const result = recommendStack({ projectType: "saas", hosting: "cpanel", budget: "low" });

    expect(result.stack).toBe("laravel-livewire");
    expect(result.avoid).toContain("Permanent Node server on shared hosting");
  });

  it("keeps prompt generation compact and transparent", () => {
    const result = generatePrompt({
      brief: "Create a WordPress plugin sold on CodeCanyon with licenses and admin settings.",
      targetAgent: "codex",
      output: "implementation",
      maxTokens: 800,
    });

    expect(String(result.prompt)).toContain("Do not invent external APIs");
    expect(result.includedContext).toEqual(expect.arrayContaining(["licensing", "marketplace"]));
  });

  it("returns template, API, database and deployment plans without network calls", () => {
    expect(getTemplate("laravel-livewire").commands).toContain("php artisan test");
    expect(apiPlan({ resources: ["products"], auth: "api-key" }).resources[0].routes).toContain("GET /products");
    expect(databaseSchema({ entities: ["product"], database: "mysql" }).migrations[0].table).toBe("products");
    expect(deployGuide({ target: "cpanel" }).steps).toContain("Point domain to public/");
  });

  it("produces safety, marketplace, debug and cost guidance", () => {
    expect(securityChecklist({ features: ["payments", "licenses"] }).featureSpecific).toHaveLength(2);
    expect(marketplaceCheck({ hasLicense: false, hasDocs: true, hasTests: false }).blockers).toHaveLength(2);
    expect(debugHelp({ error: "Vite manifest not found" }).likelyCauses[0]).toContain("asset build");
    expect(costOptimize({ prompt: "Build a dashboard with licenses", stack: "laravel-livewire" }).smartContextFirst).toContain("licensing");
  });

  it("Smart Context Mode does not dump every chunk", () => {
    const chunks = selectContext({
      brief: "Need Flutter mobile app with OAuth login and sponsored placements",
      activeTask: "implementation",
      stack: "flutter",
    });

    expect(chunks.map((chunk) => chunk.id)).toEqual(expect.arrayContaining(["mobileUx", "identity", "ads", "security"]));
    expect(chunks.length).toBeLessThan(Object.keys(contextLibrary).length);
  });
});
