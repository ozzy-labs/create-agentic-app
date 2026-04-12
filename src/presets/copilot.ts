import type { Preset } from "../types.js";
import { buildEnglishInstruction } from "./instruction-template.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const copilotPreset: Preset = {
  name: "copilot",
  instructionFile: ".github/copilot-instructions.md",
  mcpConfigPath: { path: ".copilot/mcp-config.json", format: "json" },
  files: {
    ".github/copilot-instructions.md": buildEnglishInstruction(
      "Copilot Instructions",
      "in `.copilot/mcp-config.json`",
    ),
  },
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
