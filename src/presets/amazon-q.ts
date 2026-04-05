import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const amazonQPreset: Preset = {
  name: "amazon-q",
  instructionFile: ".amazonq/rules/project.md",
  mcpConfigPath: { path: ".amazonq/mcp.json", format: "json" },
  files: readTemplateFiles("amazon-q"),
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
