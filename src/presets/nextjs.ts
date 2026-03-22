import type { Preset } from "../types.js";
import { readTemplateFiles } from "../utils.js";

export const nextjsPreset: Preset = {
  name: "nextjs",
  requires: ["typescript"],
  files: readTemplateFiles("nextjs"),
  merge: {
    ".gitignore": "# Next.js\n.next/\nout/\n!next-env.d.ts",
    "biome.json": {
      files: { includes: ["!**/.next/"] },
    },
    ".vscode/settings.json": {
      "search.exclude": { "**/.next": true },
      "files.exclude": { "**/.next": true },
    },
    "package.json": {
      scripts: {
        dev: "pnpm --filter web dev",
        build: "pnpm run build:web",
        "build:web": "pnpm --filter web build",
        start: "pnpm --filter web start",
      },
    },
  },
  markdown: {
    "CLAUDE.md": [
      {
        placeholder: "<!-- SECTION:TECH_STACK -->",
        content: "- **Frontend**: Next.js 15 (App Router)",
      },
      {
        placeholder: "<!-- SECTION:PROJECT_STRUCTURE -->",
        content: "web/          -> Frontend (Next.js App Router)",
      },
    ],
    "README.md": [
      {
        placeholder: "<!-- SECTION:DIR_STRUCTURE -->",
        content: "├── web/                 # フロントエンド (Next.js App Router)",
      },
    ],
  },
  // No ciSteps needed — TypeScript's "Build" step runs `pnpm run build`,
  // which executes `pnpm run build:web` since Next.js overrides the build script.
};
