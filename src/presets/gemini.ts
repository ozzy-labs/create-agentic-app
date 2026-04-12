import type { Preset } from "../types.js";
import { buildEnglishInstruction } from "./instruction-template.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const geminiPreset: Preset = {
  name: "gemini",
  instructionFile: "GEMINI.md",
  mcpConfigPath: { path: ".gemini/settings.json", format: "json" },
  files: {
    "GEMINI.md": buildEnglishInstruction("GEMINI.md", "in `.gemini/settings.json`"),
  },
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
