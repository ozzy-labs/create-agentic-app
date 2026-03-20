import type { Preset } from "./types.js";

/**
 * Expand the setup.sh template by replacing the `# SETUP:EXTRA` placeholder
 * with extra setup commands from active presets.
 */
export function expandSetupScript(template: string, presets: Preset[]): string {
  const extraLines: string[] = [];
  for (const preset of presets) {
    if (preset.setupExtra) {
      extraLines.push(`# ${preset.name}`);
      extraLines.push(preset.setupExtra);
      extraLines.push("");
    }
  }
  const replacement = extraLines.length > 0 ? extraLines.join("\n") : "";
  return template.replace("# SETUP:EXTRA", replacement);
}
