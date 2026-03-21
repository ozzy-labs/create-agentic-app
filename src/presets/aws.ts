import type { Preset } from "../types.js";

export const awsPreset: Preset = {
  name: "aws",
  files: {},
  merge: {
    ".mise.toml": {
      tools: {
        awscli: "2",
      },
    },
    ".devcontainer/devcontainer.json": {
      mounts: [
        // biome-ignore lint/suspicious/noTemplateCurlyInString: devcontainer variable syntax
        "source=${localEnv:HOME}/.aws,target=/home/vscode/.aws,type=bind,consistency=cached",
      ],
    },
    ".mcp.json": {
      mcpServers: {
        "aws-iac": {
          command: "uvx",
          args: ["awslabs.aws-iac-mcp@latest"],
        },
      },
    },
  },
  markdown: {
    "CLAUDE.md": [
      {
        placeholder: "<!-- SECTION:TECH_STACK_MCP -->",
        content: ", AWS IaC",
      },
    ],
  },
};
