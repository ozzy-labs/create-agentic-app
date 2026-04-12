import type { Preset } from "../types.js";
import { buildEnglishInstruction } from "./instruction-template.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const amazonQPreset: Preset = {
  name: "amazon-q",
  instructionFile: ".amazonq/rules/project.md",
  mcpConfigPath: { path: ".amazonq/mcp.json", format: "json" },
  files: {
    ".amazonq/rules/project.md": buildEnglishInstruction("Project Rules", "in `.amazonq/mcp.json`"),
  },
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
