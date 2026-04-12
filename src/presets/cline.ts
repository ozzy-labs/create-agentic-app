import type { Preset } from "../types.js";
import { buildEnglishInstruction } from "./instruction-template.js";
import { DEFAULT_MCP_SERVERS } from "./shared.js";

export const clinePreset: Preset = {
  name: "cline",
  instructionFile: ".clinerules/project.md",
  files: {
    ".clinerules/project.md": buildEnglishInstruction(
      "Project Rules",
      "in Cline UI (VS Code extension settings)",
    ),
  },
  merge: {},
  mcpServers: { ...DEFAULT_MCP_SERVERS },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
