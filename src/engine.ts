export type ProjectType =
  | "landing"
  | "website"
  | "saas"
  | "marketplace"
  | "dashboard"
  | "api"
  | "mobile"
  | "wordpress"
  | "ecommerce"
  | "crm"
  | "license-system"
  | "docs"
  | "script";

export type StackId =
  | "laravel-livewire"
  | "nextjs"
  | "flutter"
  | "wordpress"
  | "node-api"
  | "fastapi"
  | "static";

export type HostingTarget =
  | "cpanel"
  | "vps"
  | "docker"
  | "vercel"
  | "render"
  | "railway"
  | "cloudflare-pages"
  | "firebase"
  | "supabase"
  | "mobile-stores";

export interface ContextChunk {
  id: string;
  title: string;
  tokens: number;
  content: string[];
}

export interface ProjectAnalysis {
  type: ProjectType;
  confidence: number;
  modules: string[];
  risks: string[];
  milestones: string[];
  smartContext: string[];
}

export interface StackRecommendation {
  stack: StackId;
  reason: string;
  backend: string;
  frontend: string;
  database: string;
  deploy: string;
  avoid: string[];
}

export interface TemplateSpec {
  id: StackId | "saas" | "marketplace" | "api" | "docs";
  files: string[];
  commands: string[];
  notes: string[];
}

const projectSignals: Array<{ type: ProjectType; words: string[] }> = [
  { type: "saas", words: ["saas", "subscription", "billing", "tenant", "abonnement"] },
  { type: "marketplace", words: ["marketplace", "vendor", "seller", "store", "codecanyon", "codinfy store"] },
  { type: "mobile", words: ["mobile", "flutter", "android", "ios", "react native"] },
  { type: "api", words: ["api", "rest", "graphql", "webhook", "sdk"] },
  { type: "dashboard", words: ["dashboard", "admin", "analytics", "kpi", "crm"] },
  { type: "wordpress", words: ["wordpress", "plugin", "woocommerce"] },
  { type: "ecommerce", words: ["ecommerce", "e-commerce", "shop", "cart", "checkout"] },
  { type: "license-system", words: ["license", "licence", "activation", "purchase code"] },
  { type: "docs", words: ["docs", "documentation", "knowledge base", "wiki"] },
  { type: "landing", words: ["landing", "lead", "campaign", "waitlist"] },
  { type: "crm", words: ["crm", "pipeline", "lead", "sales"] },
  { type: "script", words: ["script", "cli", "automation", "cron"] },
];

const moduleSignals: Array<{ module: string; words: string[] }> = [
  { module: "auth", words: ["login", "auth", "account", "sso", "oauth"] },
  { module: "payments", words: ["payment", "checkout", "invoice", "billing", "mobile money"] },
  { module: "licenses", words: ["license", "licence", "activation", "purchase code"] },
  { module: "admin", words: ["admin", "dashboard", "backoffice", "manage"] },
  { module: "marketplace", words: ["vendor", "seller", "marketplace", "store"] },
  { module: "ads", words: ["ads", "sponsored", "advertising", "monetization"] },
  { module: "notifications", words: ["email", "push", "notification", "sms"] },
  { module: "api", words: ["api", "webhook", "integration", "sdk"] },
  { module: "pwa-mobile-ux", words: ["pwa", "mobile", "offline", "app-like"] },
  { module: "docs", words: ["docs", "readme", "guide", "changelog"] },
];

export const contextLibrary: Record<string, ContextChunk> = {
  laravel: {
    id: "laravel",
    title: "Laravel shared-hosting stack",
    tokens: 180,
    content: [
      "Use Laravel 13 when the project needs PHP shared hosting, admin workflows, queues, payments or marketplace logic.",
      "Prefer Blade + Livewire for operational UIs; queue/cache/session can run on database/file drivers.",
      "Keep deployments cPanel-friendly: no permanent Node server, commit built assets when the host cannot build.",
    ],
  },
  mobileUx: {
    id: "mobileUx",
    title: "Desktop + web mobile app-like UX",
    tokens: 150,
    content: [
      "Desktop should use stable navigation, dense but readable panels, and predictable actions.",
      "Mobile should feel app-like: bottom nav/actions, bottom sheets, 44px touch targets, sticky submit bars.",
      "Always define loading, empty, error and offline states for core workflows.",
    ],
  },
  licensing: {
    id: "licensing",
    title: "License integration",
    tokens: 150,
    content: [
      "Never hardcode license secrets in public repositories.",
      "Use HMAC request signing, anti-replay timestamps, RS256/JWKS verification and a graceful read-only period.",
      "Keep local validation defensive: fail closed for tampering, fail gracefully for temporary network issues.",
    ],
  },
  payments: {
    id: "payments",
    title: "Payments",
    tokens: 140,
    content: [
      "Choose the payment gateway according to region and buyer behavior.",
      "Do not fabricate successful payment states; rely on signed webhooks and idempotent status transitions.",
      "Mobile-money flows need clear waiting screens, polling/backoff and expired/cancelled states.",
    ],
  },
  identity: {
    id: "identity",
    title: "Login with Codinfy / OAuth",
    tokens: 130,
    content: [
      "Use PKCE for public clients and store tokens server-side when possible.",
      "Document scopes, callback URLs, logout, userinfo and JWKS validation.",
      "If Login with Codinfy endpoints are not yet shipped in a target app, mark the integration as planned instead of inventing endpoints.",
    ],
  },
  ads: {
    id: "ads",
    title: "Codinfy Ads readiness",
    tokens: 130,
    content: [
      "Sponsored placements must be visibly labelled as sponsored or advertising.",
      "Track impressions and clicks with signed events, privacy limits and fraud controls.",
      "Do not add ads unless the project explicitly needs monetization or sponsored discovery.",
    ],
  },
  security: {
    id: "security",
    title: "Security baseline",
    tokens: 180,
    content: [
      "Secrets stay in env or encrypted config stores, never in code, docs screenshots or test fixtures.",
      "Validate input at request boundaries, authorize per resource owner, audit sensitive actions.",
      "Add rate limits for auth, webhooks, checkout, public APIs and expensive AI actions.",
    ],
  },
  marketplace: {
    id: "marketplace",
    title: "Marketplace readiness",
    tokens: 150,
    content: [
      "A sellable product needs installation docs, changelog, screenshots, demo data controls, license checks and support policy.",
      "Remove mock accounts, lorem ipsum, dead links and fake payment flows before packaging.",
      "CodeCanyon/Codinfy Store packages should include clean upgrade paths and rollback notes.",
    ],
  },
};

function normalize(input: string): string {
  return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(normalize(word)));
}

export function analyzeProject(input: { brief: string; constraints?: string[]; mustHave?: string[] }): ProjectAnalysis {
  const brief = normalize([input.brief, ...(input.constraints ?? []), ...(input.mustHave ?? [])].join(" "));
  const matched = projectSignals.filter((signal) => includesAny(brief, signal.words));
  const type = matched[0]?.type ?? "website";
  const modules = moduleSignals.filter((signal) => includesAny(brief, signal.words)).map((signal) => signal.module);
  const uniqueModules = [...new Set(modules.length ? modules : ["content", "contact", "admin"])];
  const risks = [
    uniqueModules.includes("payments") ? "Payment states must come from signed webhooks, not optimistic UI." : null,
    uniqueModules.includes("licenses") ? "License secrets and private keys must never ship in the client package." : null,
    uniqueModules.includes("ads") ? "Sponsored placements need visible labels and anti-fraud controls." : null,
    type === "marketplace" ? "Multi-vendor permissions and payouts need strict ownership checks." : null,
    "Avoid mock data in production flows; keep placeholders explicit in docs only.",
  ].filter((risk): risk is string => Boolean(risk));

  const smartContext = selectContext({
    brief: input.brief,
    activeTask: "project planning",
    stack: type === "mobile" ? "flutter" : type === "wordpress" ? "wordpress" : "laravel-livewire",
  }).map((chunk) => chunk.id);

  return {
    type,
    confidence: matched.length ? Math.min(0.95, 0.62 + matched.length * 0.08) : 0.52,
    modules: uniqueModules,
    risks,
    milestones: [
      "Clarify users, roles, success metric and launch constraints.",
      "Lock stack, data model and deployment target.",
      "Build core flows with real validations, permissions and persistence.",
      "Add tests, docs, install/deploy guide and marketplace packaging checks.",
    ],
    smartContext,
  };
}

export function recommendStack(input: {
  projectType?: ProjectType;
  hosting?: HostingTarget | "unknown";
  budget?: "low" | "medium" | "high";
  teamLevel?: "beginner" | "intermediate" | "senior";
}): StackRecommendation {
  const hosting = input.hosting ?? "unknown";
  const projectType = input.projectType ?? "website";

  if (projectType === "mobile" || hosting === "mobile-stores") {
    return {
      stack: "flutter",
      reason: "Mobile-first product with one codebase and predictable store packaging.",
      backend: "Laravel API or Supabase depending on auth and payment needs",
      frontend: "Flutter",
      database: "PostgreSQL or MySQL",
      deploy: "App Store / Play Store plus API on VPS/cPanel-compatible Laravel when needed",
      avoid: ["Putting business secrets in the mobile app", "Skipping offline/error states"],
    };
  }

  if (projectType === "wordpress") {
    return {
      stack: "wordpress",
      reason: "WordPress is the shortest path for plugins, content-heavy sites and WooCommerce extensions.",
      backend: "WordPress plugin architecture",
      frontend: "PHP templates + block editor where useful",
      database: "MySQL",
      deploy: "cPanel or managed WordPress",
      avoid: ["Custom tables without upgrade routines", "Admin actions without nonces/capability checks"],
    };
  }

  if (hosting === "vercel" || hosting === "cloudflare-pages") {
    return {
      stack: "nextjs",
      reason: "Static/serverless hosting with React UI and edge-friendly content.",
      backend: "Next.js route handlers or external API",
      frontend: "Next.js + React",
      database: "PostgreSQL/Supabase for app data",
      deploy: hosting === "vercel" ? "Vercel" : "Cloudflare Pages",
      avoid: ["Long-running jobs in serverless handlers", "Secret leakage to NEXT_PUBLIC_*"],
    };
  }

  return {
    stack: "laravel-livewire",
    reason: "Best fit for SaaS, marketplaces, dashboards, APIs and shared hosting.",
    backend: "Laravel 13, queues on database, cache file/database",
    frontend: "Blade + Livewire + Alpine + Tailwind CSS",
    database: "MySQL/MariaDB by default; PostgreSQL when the host supports it",
    deploy: hosting === "cpanel" || hosting === "unknown" ? "cPanel/shared hosting compatible" : "VPS with PHP-FPM",
    avoid: ["Permanent Node server on shared hosting", "Docker-only production assumptions", "Mock checkout/license flows"],
  };
}

export function getArchitecture(input: { projectType: ProjectType; stack: StackId }): Record<string, unknown> {
  return {
    stack: input.stack,
    projectType: input.projectType,
    layers: [
      "Presentation: routes, pages/components, responsive shell, loading/empty/error states",
      "Application: controllers/live components/use cases, authorization, validation",
      "Domain: models/entities, services, policies, events",
      "Infrastructure: database, queues, storage, mail, payment/webhook clients",
      "Quality: tests, docs, install/deploy scripts, observability",
    ],
    moduleOrder: [
      "auth and roles",
      "core data model",
      "admin/client workflows",
      "payments/licenses/integrations when required",
      "docs, tests, packaging",
    ],
  };
}

export function getTemplate(id: TemplateSpec["id"]): TemplateSpec {
  const common = {
    files: ["README.md", ".env.example", "tests/", "docs/INSTALL.md", "docs/DEPLOY.md"],
    commands: ["install dependencies", "run tests", "build assets"],
    notes: ["Keep secrets out of examples.", "Ship real empty/error states.", "Document upgrade path."],
  };

  const templates: Record<TemplateSpec["id"], TemplateSpec> = {
    "laravel-livewire": {
      id,
      files: ["app/Models", "app/Services", "app/Livewire", "resources/views", "routes/web.php", ...common.files],
      commands: ["composer install", "php artisan migrate", "npm install", "npm run build", "php artisan test"],
      notes: ["Use Form Requests/policies for boundaries.", "Use cursor pagination for large lists.", ...common.notes],
    },
    nextjs: {
      id,
      files: ["app/", "components/", "lib/", "tests/", "public/", ...common.files],
      commands: ["npm install", "npm run lint", "npm run build", "npm test"],
      notes: ["Separate server-only secrets from client components.", ...common.notes],
    },
    flutter: {
      id,
      files: ["lib/features", "lib/core", "test", "integration_test", "pubspec.yaml", ...common.files],
      commands: ["flutter pub get", "flutter test", "flutter build apk"],
      notes: ["Keep API secrets on the server.", "Handle offline and permission states.", ...common.notes],
    },
    wordpress: {
      id,
      files: ["plugin.php", "includes/", "admin/", "public/", "uninstall.php", ...common.files],
      commands: ["composer install --no-dev", "npm run build", "vendor/bin/phpunit"],
      notes: ["Use nonces and capability checks.", "Add activation/deactivation routines.", ...common.notes],
    },
    "node-api": {
      id,
      files: ["src/routes", "src/services", "src/db", "tests", ...common.files],
      commands: ["npm install", "npm run build", "npm test"],
      notes: ["Use explicit schemas at every route boundary.", ...common.notes],
    },
    fastapi: {
      id,
      files: ["app/api", "app/services", "app/models", "tests", "pyproject.toml", ...common.files],
      commands: ["pip install -e .", "pytest", "ruff check"],
      notes: ["Use pydantic schemas and dependency-based auth.", ...common.notes],
    },
    static: {
      id,
      files: ["index.html", "assets/", "content/", ...common.files],
      commands: ["npm install", "npm run build"],
      notes: ["Keep forms wired to a real backend or mark them disabled.", ...common.notes],
    },
    saas: {
      id,
      files: ["billing/", "tenancy/", "admin/", "client/", ...common.files],
      commands: common.commands,
      notes: ["Model subscriptions, invoices and dunning states explicitly.", ...common.notes],
    },
    marketplace: {
      id,
      files: ["catalog/", "vendors/", "orders/", "payouts/", "reviews/", ...common.files],
      commands: common.commands,
      notes: ["Ownership checks are mandatory for every vendor resource.", ...common.notes],
    },
    api: {
      id,
      files: ["openapi.yaml", "src/routes", "src/clients", "tests/contract", ...common.files],
      commands: common.commands,
      notes: ["Publish OpenAPI and contract tests.", ...common.notes],
    },
    docs: {
      id,
      files: ["docs/index.md", "docs/api.md", "docs/changelog.md", "examples/", ...common.files],
      commands: ["lint markdown", "check links"],
      notes: ["Document only shipped features; label roadmap honestly.", ...common.notes],
    },
  };

  return templates[id];
}

export function selectContext(input: { brief: string; activeTask?: string; stack?: string; include?: string[] }): ContextChunk[] {
  const haystack = normalize([input.brief, input.activeTask ?? "", input.stack ?? "", ...(input.include ?? [])].join(" "));
  const chosen = new Set<string>();

  if (includesAny(haystack, ["laravel", "saas", "marketplace", "dashboard", "cpanel"])) chosen.add("laravel");
  if (includesAny(haystack, ["mobile", "pwa", "app-like", "dashboard", "frontend"])) chosen.add("mobileUx");
  if (includesAny(haystack, ["license", "licence", "activation", "codecanyon"])) chosen.add("licensing");
  if (includesAny(haystack, ["payment", "checkout", "invoice", "billing"])) chosen.add("payments");
  if (includesAny(haystack, ["oauth", "sso", "login with codinfy", "identity"])) chosen.add("identity");
  if (includesAny(haystack, ["ads", "sponsored", "monetization", "publicite"])) chosen.add("ads");
  if (includesAny(haystack, ["marketplace", "codecanyon", "codinfy store", "sell"])) chosen.add("marketplace");

  chosen.add("security");

  return [...chosen].map((id) => contextLibrary[id]).filter(Boolean);
}

export function generatePrompt(input: {
  brief: string;
  targetAgent?: "codex" | "claude-code" | "cursor" | "windsurf" | "generic";
  output?: "plan" | "implementation" | "review" | "handoff";
  maxTokens?: number;
}): Record<string, unknown> {
  const analysis = analyzeProject({ brief: input.brief });
  const chunks = selectContext({ brief: input.brief, activeTask: input.output ?? "implementation" });
  const compactRules = chunks.map((chunk) => `${chunk.title}: ${chunk.content[0]}`).join("\n- ");

  return {
    targetAgent: input.targetAgent ?? "generic",
    estimatedTokens: Math.min(input.maxTokens ?? 900, 350 + chunks.length * 80),
    prompt: [
      `Build/continue this ${analysis.type} project: ${input.brief}`,
      "Rules:",
      `- ${compactRules}`,
      "- Read the existing codebase first; preserve user changes; ship tests and docs for touched behavior.",
      "- Do not invent external APIs, payment states or credentials. Mark missing upstream dependencies honestly.",
      `Expected output: ${input.output ?? "implementation"} with verification notes.`,
    ].join("\n"),
    includedContext: chunks.map((chunk) => chunk.id),
  };
}

export function licenseInstructions(input: { stack: StackId; productType?: string; offlineGraceHours?: number }): Record<string, unknown> {
  return {
    stack: input.stack,
    productType: input.productType ?? "commercial script",
    offlineGraceHours: input.offlineGraceHours ?? 72,
    steps: [
      "Generate a server-side license client; never place HMAC/private keys in browser/mobile bundles.",
      "Send purchase_code, domain, version and timestamp with HMAC-SHA256 over the exact raw body.",
      "Verify RS256 JWT responses locally and reject alg=none or unexpected issuer/audience.",
      "Cache valid status briefly; during network outage use read-only grace, not a hard crash.",
      "Document activation, domain change, support expiry and update download behavior.",
    ],
  };
}

export function designSystem(input: { platform?: string; brandName?: string; primaryColor?: string }): Record<string, unknown> {
  const primary = input.primaryColor ?? "#1A1A1A";

  return {
    brandName: input.brandName ?? "Project",
    platform: input.platform ?? "web",
    tokens: {
      colors: { primary, accent: "#2563EB", success: "#34BB78", warning: "#EF9F27", danger: "#D40000" },
      radius: "8px",
      minTouchTarget: "44px",
      typography: ["Inter", "Plus Jakarta Sans", "system-ui"],
    },
    components: ["button", "input", "select", "modal", "data table", "toast", "bottom sheet", "tabs"],
    uxRules: contextLibrary.mobileUx.content,
  };
}

export function apiPlan(input: { resources: string[]; auth?: "none" | "session" | "api-key" | "oauth"; style?: "rest" | "graphql" }): Record<string, unknown> {
  const resources = input.resources.length ? input.resources : ["items"];
  const style = input.style ?? "rest";

  return {
    style,
    auth: input.auth ?? "session",
    resources: resources.map((resource) => ({
      resource,
      routes:
        style === "rest"
          ? [`GET /${resource}`, `POST /${resource}`, `GET /${resource}/{id}`, `PATCH /${resource}/{id}`, `DELETE /${resource}/{id}`]
          : [`query ${resource}`, `mutation create${capitalize(resource)}`, `mutation update${capitalize(resource)}`],
      validation: ["required fields", "ownership checks", "rate limits for public writes"],
      tests: ["auth required", "validation errors", "owner can access", "stranger cannot access"],
    })),
  };
}

export function databaseSchema(input: { entities: string[]; database?: "mysql" | "postgresql" | "sqlite" | "mongodb" }): Record<string, unknown> {
  const entities = input.entities.length ? input.entities : ["users", "projects", "audit_logs"];

  return {
    database: input.database ?? "mysql",
    migrations: entities.map((entity) => ({
      table: pluralize(entity),
      columns: ["id", "uuid", "name/title", "status", "metadata json nullable", "created_at", "updated_at"],
      indexes: ["uuid unique", "status", "created_at"],
    })),
    relations: ["users own resources", "audit_logs polymorphic subject", "soft deletes for business-critical records"],
    seeders: ["configuration defaults only", "demo data gated to local/staging"],
  };
}

export function securityChecklist(input: { stack?: StackId; features?: string[]; compliance?: string[] }): Record<string, unknown> {
  const features = input.features ?? [];

  return {
    stack: input.stack ?? "laravel-livewire",
    critical: [
      "No secrets in source, prompts, screenshots or client bundles.",
      "Authentication, authorization and ownership checks on every protected resource.",
      "Validation at all request boundaries with typed schemas/Form Requests.",
      "Rate limits for auth, webhooks, checkout, public APIs and AI endpoints.",
      "Audit logs for admin, billing, license and security actions.",
    ],
    featureSpecific: [
      features.includes("payments") ? "Verify signed webhooks and make state transitions idempotent." : null,
      features.includes("ads") ? "Label sponsored content and sign impression/click events." : null,
      features.includes("licenses") ? "HMAC request signing, RS256 verification and graceful read-only mode." : null,
      features.includes("oauth") ? "Use PKCE, strict redirect URI matching and JWKS rotation handling." : null,
    ].filter(Boolean),
    compliance: input.compliance ?? ["privacy policy", "data retention", "export/delete process"],
  };
}

export function marketplaceCheck(input: {
  target?: "codinfy-store" | "codecanyon" | "both";
  projectType?: ProjectType;
  hasLicense?: boolean;
  hasDocs?: boolean;
  hasTests?: boolean;
}): Record<string, unknown> {
  const blockers = [
    input.hasLicense ? null : "Add license activation/validation and domain-change documentation.",
    input.hasDocs ? null : "Add install, admin, user, API and changelog docs.",
    input.hasTests ? null : "Add automated tests for purchase, install, auth and update flows.",
  ].filter(Boolean);

  return {
    target: input.target ?? "both",
    projectType: input.projectType ?? "script",
    score: Math.max(35, 100 - blockers.length * 20),
    blockers,
    requiredAssets: ["screenshots", "demo credentials policy", "support policy", "versioned changelog", "upgrade guide"],
  };
}

export function docsOutline(input: { projectName: string; projectType?: ProjectType; sections?: string[] }): Record<string, unknown> {
  const base = ["README", "Installation", "Admin guide", "User guide", "API reference", "Changelog", "Security"];

  return {
    projectName: input.projectName,
    projectType: input.projectType ?? "website",
    sections: input.sections?.length ? input.sections : base,
    snippets: {
      readme: `# ${input.projectName}\n\nProduction-ready ${input.projectType ?? "project"} with documented setup, tests and deployment.`,
      install: "List prerequisites, env vars, database migrations, seeders and first-admin flow.",
      changelog: "Keep semantic versions and migration notes.",
    },
  };
}

export function deployGuide(input: { target: HostingTarget; stack?: StackId }): Record<string, unknown> {
  const target = input.target;
  const guides: Record<HostingTarget, string[]> = {
    cpanel: ["Build assets locally", "Upload app outside public_html", "Point domain to public/", "Set cron schedule:run", "Run migrations and cache config/routes/views"],
    vps: ["Provision PHP/Node runtime", "Configure reverse proxy", "Set process manager for queues", "Enable backups and monitoring"],
    docker: ["Create production Dockerfile", "Use secrets manager", "Run migrations as one-off job", "Persist storage volumes"],
    vercel: ["Move long jobs out of serverless handlers", "Configure env vars", "Use managed database", "Run preview deployments"],
    render: ["Set build/start commands", "Use persistent disk if needed", "Configure health check"],
    railway: ["Configure services and variables", "Run migrations on deploy", "Set resource limits"],
    "cloudflare-pages": ["Use static/edge-safe code", "Move server tasks to Workers", "Configure KV/R2 when needed"],
    firebase: ["Use Hosting + Functions", "Secure Firestore rules", "Configure emulators for tests"],
    supabase: ["Design RLS policies", "Generate typed clients", "Keep service role key server-side"],
    "mobile-stores": ["Configure signing", "Prepare privacy labels", "Test offline and upgrade paths", "Submit store builds"],
  };

  return { target, stack: input.stack ?? "laravel-livewire", steps: guides[target] };
}

export function debugHelp(input: { stack?: StackId; error: string; environment?: string }): Record<string, unknown> {
  const error = normalize(input.error);
  const hints = [
    error.includes("csrf") ? "Check CSRF token, SameSite cookie, session domain and Livewire request URL." : null,
    error.includes("vite") || error.includes("manifest") ? "Run the asset build and verify public/build/manifest.json is deployed." : null,
    error.includes("permission") ? "Check storage/bootstrap cache permissions and the PHP user." : null,
    error.includes("database") || error.includes("sql") ? "Verify env DB settings, migrations and failed query logs." : null,
    error.includes("module") ? "Install dependencies and verify ESM import paths include .js after TypeScript compile." : null,
  ].filter(Boolean);

  return {
    stack: input.stack ?? "laravel-livewire",
    environment: input.environment ?? "local",
    likelyCauses: hints.length ? hints : ["Reproduce with logs enabled, isolate last change, add a failing test, then patch the narrowest boundary."],
    commands: ["run test suite", "run build/typecheck", "inspect logs", "verify env/config cache"],
  };
}

export function costOptimize(input: { prompt?: string; stack?: StackId; budget?: "low" | "medium" | "high" }): Record<string, unknown> {
  const prompt = input.prompt ?? "";
  const tokenEstimate = Math.ceil(prompt.length / 4);

  return {
    estimatedPromptTokens: tokenEstimate,
    promptSavings: [
      "Use codix.context.smart before long implementation prompts.",
      "Ask for one module at a time with explicit file boundaries.",
      "Reuse templates/prompt-packs instead of pasting full docs every turn.",
    ],
    infraSavings: [
      input.stack === "laravel-livewire" ? "Use cPanel/file/database drivers until traffic requires Redis/queues workers." : null,
      input.stack === "nextjs" ? "Prefer static generation for marketing/docs pages." : null,
      input.stack === "flutter" ? "Keep expensive AI/payment calls server-side." : null,
    ].filter(Boolean),
    smartContextFirst: selectContext({ brief: prompt || "general build", stack: input.stack }).map((chunk) => chunk.id),
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function pluralize(value: string): string {
  return value.endsWith("s") ? value : `${value}s`;
}
