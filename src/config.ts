export const PACKAGE_NAME = "@codinfy/codix-build-mcp";
export const PACKAGE_VERSION = "0.1.0";

export type RuntimeMode = "public" | "authenticated";

export interface CodixBuildConfig {
  mode: RuntimeMode;
  apiKey: string | null;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): CodixBuildConfig {
  const apiKey = env.CODIX_BUILD_API_KEY?.trim() || null;

  return {
    mode: apiKey ? "authenticated" : "public",
    apiKey,
  };
}
