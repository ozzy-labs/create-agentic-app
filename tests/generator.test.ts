import { describe, expect, it } from "vitest";
import { generate, resolvePresets } from "../src/generator.js";
import type { WizardAnswers } from "../src/types.js";

// Helper to create answers with defaults
function makeAnswers(overrides: Partial<WizardAnswers> = {}): WizardAnswers {
  return {
    projectName: "test-app",
    languages: [],
    frontend: "none",
    iac: "none",
    ...overrides,
  };
}

describe("resolvePresets", () => {
  it("always includes base", () => {
    const result = resolvePresets(makeAnswers());
    expect(result).toContain("base");
  });

  it("includes selected languages", () => {
    const result = resolvePresets(makeAnswers({ languages: ["typescript", "python"] }));
    expect(result).toEqual(["base", "typescript", "python"]);
  });

  it("forces typescript when react is selected", () => {
    const result = resolvePresets(makeAnswers({ frontend: "react" }));
    expect(result).toContain("typescript");
    expect(result).toContain("react");
  });

  it("forces typescript when cdk is selected", () => {
    const result = resolvePresets(makeAnswers({ iac: "cdk" }));
    expect(result).toContain("typescript");
    expect(result).toContain("cdk");
  });

  it("maintains canonical order", () => {
    const result = resolvePresets(
      makeAnswers({ languages: ["python", "typescript"], frontend: "react", iac: "cdk" }),
    );
    expect(result).toEqual(["base", "typescript", "python", "react", "cdk"]);
  });

  it("deduplicates typescript when forced by multiple selections", () => {
    const result = resolvePresets(
      makeAnswers({ languages: ["typescript"], frontend: "react", iac: "cdk" }),
    );
    const tsCount = result.filter((p) => p === "typescript").length;
    expect(tsCount).toBe(1);
  });
});

describe("generate (base only)", () => {
  const answers = makeAnswers();
  const result = generate(answers);

  it("generates base owned files", () => {
    expect(result.hasFile(".gitignore")).toBe(true);
    expect(result.hasFile(".editorconfig")).toBe(true);
    expect(result.hasFile(".commitlintrc.yaml")).toBe(true);
    expect(result.hasFile(".devcontainer/Dockerfile")).toBe(true);
    expect(result.hasFile(".vscode/settings.json")).toBe(true);
    expect(result.hasFile(".github/CODEOWNERS")).toBe(true);
    expect(result.hasFile("docs/adding-tools.md")).toBe(true);
    expect(result.hasFile("docs/branch-strategy.md")).toBe(true);
    expect(result.hasFile(".hadolint.yaml")).toBe(true);
    expect(result.hasFile("trivy.yaml")).toBe(true);
    expect(result.hasFile("renovate.json")).toBe(true);
    expect(result.hasFile(".mcp.json.example")).toBe(true);
  });

  it("generates merged package.json with base scripts", () => {
    const pkg = result.readJson("package.json") as Record<string, unknown>;
    expect(pkg.name).toBe("test-app");
    expect(pkg.type).toBe("module");
    const scripts = pkg.scripts as Record<string, string>;
    expect(scripts.prepare).toBe("lefthook install");
    expect(scripts["lint:yaml"]).toContain("yamllint");
    expect(scripts["lint:secrets"]).toContain("gitleaks");
  });

  it("generates merged .mise.toml with base tools", () => {
    const toml = result.readToml(".mise.toml") as Record<string, Record<string, string>>;
    expect(toml.tools.node).toBe("24");
    expect(toml.tools.pnpm).toBe("10");
    expect(toml.tools.shellcheck).toBe("0.11");
    expect(toml.tools.lefthook).toBe("2");
  });

  it("generates merged lefthook.yaml with base hooks", () => {
    const hook = result.readYaml("lefthook.yaml") as Record<string, unknown>;
    const preCommit = hook["pre-commit"] as Record<string, unknown>;
    const commands = preCommit.commands as Record<string, unknown>;
    expect(commands.shellcheck).toBeDefined();
    expect(commands.gitleaks).toBeDefined();
    expect(commands.markdownlint).toBeDefined();
  });

  it("generates merged .mcp.json with base servers", () => {
    const mcp = result.readJson(".mcp.json") as Record<string, Record<string, unknown>>;
    expect(mcp.mcpServers.context7).toBeDefined();
    expect(mcp.mcpServers.fetch).toBeDefined();
  });

  it("generates CI workflow", () => {
    expect(result.hasFile(".github/workflows/ci.yaml")).toBe(true);
    const ci = result.readYaml(".github/workflows/ci.yaml") as Record<string, unknown>;
    expect(ci.name).toBe("CI");
    const jobs = ci.jobs as Record<string, Record<string, unknown>>;
    const steps = jobs["lint-and-check"].steps as Array<Record<string, unknown>>;
    const stepNames = steps.map((s) => s.name);
    expect(stepNames).toContain("Lint (Markdown)");
    expect(stepNames).toContain("Security (Gitleaks)");
  });

  it("generates setup.sh", () => {
    expect(result.hasFile("scripts/setup.sh")).toBe(true);
    const setup = result.readText("scripts/setup.sh");
    expect(setup).toContain("mise trust");
    expect(setup).toContain("mise install");
    expect(setup).toContain("pnpm install");
  });

  it("replaces {{projectName}} in templates", () => {
    const readme = result.readText("README.md");
    expect(readme).toContain("# test-app");
    expect(readme).not.toContain("{{projectName}}");

    const claude = result.readText("CLAUDE.md");
    expect(claude).toContain("test-app");
    expect(claude).not.toContain("{{projectName}}");
  });

  it("generates CLAUDE.md with expanded placeholders", () => {
    const claude = result.readText("CLAUDE.md");
    // Placeholders should be replaced (even if with empty string)
    expect(claude).not.toContain("<!-- SECTION:PRE_PUSH_HOOKS -->");
    expect(claude).not.toContain("<!-- SECTION:GIT_WORKFLOW -->");
  });
});
