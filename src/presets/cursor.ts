import type { Preset } from "../types.js";
import { buildEnglishInstruction } from "./instruction-template.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

const CURSOR_MDC_PREFIX = `---
description: Project-wide rules and conventions
globs:
---

`;

export const cursorPreset: Preset = {
  name: "cursor",
  instructionFile: ".cursor/rules/project.mdc",
  mcpConfigPath: { path: ".cursor/mcp.json", format: "json" },
  files: {
    ".cursor/rules/project.mdc": buildEnglishInstruction(
      "Project Rules",
      "in `.cursor/mcp.json`",
      CURSOR_MDC_PREFIX,
    ),
  },
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
