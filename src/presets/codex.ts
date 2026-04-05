import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const codexPreset: Preset = {
  name: "codex",
  instructionFile: "AGENTS.md",
  mcpConfigPath: { path: ".codex/config.toml", format: "toml" },
  files: readTemplateFiles("codex"),
  merge: {
    ".devcontainer/devcontainer.json": {
      remoteEnv: {
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        OPENAI_API_KEY: "${localEnv:OPENAI_API_KEY}",
      },
    },
  },
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
