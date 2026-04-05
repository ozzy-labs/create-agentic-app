import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const cursorPreset: Preset = {
  name: "cursor",
  instructionFile: ".cursor/rules/project.mdc",
  mcpConfigPath: { path: ".cursor/mcp.json", format: "json" },
  files: readTemplateFiles("cursor"),
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
