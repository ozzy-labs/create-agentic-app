import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";

export const claudeCodePreset: Preset = {
  name: "claude-code",
  files: readTemplateFiles("claude-code"),
  merge: {
    ".gitignore": ".claude/settings.local.json",
    ".devcontainer/devcontainer.json": {
      mounts: [
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        "source=${localEnv:HOME}/.claude.json,target=/home/vscode/.claude.json,type=bind,consistency=cached",
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        "source=${localEnv:HOME}/.claude/.credentials.json,target=/home/vscode/.claude/.credentials.json,type=bind,readonly,consistency=cached",
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        "source=${localEnv:HOME}/.claude/projects,target=/home/vscode/.claude/projects,type=bind,consistency=cached",
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        "source=${localEnv:HOME}/.claude/settings.json,target=/home/vscode/.claude/settings.json,type=bind,readonly,consistency=cached",
      ],
    },
  },
  mcpServers: {
    context7: {
      command: "npx",
      args: ["-y", "@upstash/context7-mcp@latest"],
    },
    fetch: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-fetch"],
    },
  },
  markdown: {
    "agent-instructions": [],
    "README.md": [],
  },
};
