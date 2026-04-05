import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const copilotPreset: Preset = {
  name: "copilot",
  instructionFile: ".github/copilot-instructions.md",
  mcpConfigPath: { path: ".copilot/mcp-config.json", format: "json" },
  files: readTemplateFiles("copilot"),
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
