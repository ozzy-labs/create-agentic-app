import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";

export const reactPreset: Preset = {
  name: "react",
  requires: ["typescript"],
  files: readTemplateFiles("react"),
  merge: {
    ".gitignore": "# React + Vite\n!web/src/vite-env.d.ts",
    "package.json": {
      scripts: {
        dev: "pnpm --filter web dev",
        build: "pnpm run build:web",
        "build:web": "pnpm --filter web build",
        preview: "pnpm --filter web preview",
      },
    },
  },
  markdown: {
    "CLAUDE.md": [
      {
        placeholder: "<!-- SECTION:TECH_STACK -->",
        content: "- **Frontend**: React 19 + Vite",
      },
      {
        placeholder: "<!-- SECTION:PROJECT_STRUCTURE -->",
        content: "web/          -> Frontend (React + Vite)",
      },
    ],
    "README.md": [
      {
        placeholder: "<!-- SECTION:DIR_STRUCTURE -->",
        content: "├── web/                 # フロントエンド (React + Vite)",
      },
    ],
  },
  // No ciSteps needed — TypeScript's "Build" step runs `pnpm run build`,
  // which executes `pnpm run build:web` since React overrides the build script.
};
