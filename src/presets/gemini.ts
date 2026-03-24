import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const geminiPreset: Preset = {
  name: "gemini",
  files: readTemplateFiles("gemini"),
  merge: {
    ".gitignore": ".gemini/.env",
    ".devcontainer/devcontainer.json": {
      remoteEnv: {
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        GEMINI_API_KEY: "${localEnv:GEMINI_API_KEY}",
      },
    },
  },
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
