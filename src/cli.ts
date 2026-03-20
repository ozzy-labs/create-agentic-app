import * as p from "@clack/prompts";
import pc from "picocolors";
import type { WizardAnswers } from "./types.js";

function handleCancel(value: unknown): void {
  if (p.isCancel(value)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }
}

export async function runWizard(defaultName?: string): Promise<WizardAnswers> {
  p.intro(pc.bold("create-agentic-dev"));

  const projectName = await p.text({
    message: "Project name",
    placeholder: "my-app",
    initialValue: defaultName ?? "",
    validate(value) {
      if (!value.trim()) return "Project name is required.";
      if (!/^[a-z0-9][a-z0-9._-]*$/i.test(value.trim())) {
        return "Invalid project name. Use alphanumeric characters, hyphens, dots, or underscores.";
      }
    },
  });
  handleCancel(projectName);

  const languages = await p.multiselect({
    message: "Languages",
    options: [
      { value: "typescript" as const, label: "TypeScript" },
      { value: "python" as const, label: "Python" },
    ],
    required: false,
  });
  handleCancel(languages);

  const frontend = await p.select({
    message: "Frontend framework",
    options: [
      { value: "none" as const, label: "None" },
      { value: "react" as const, label: "React (Vite)", hint: "forces TypeScript" },
    ],
  });
  handleCancel(frontend);

  const iac = await p.select({
    message: "Infrastructure as Code",
    options: [
      { value: "none" as const, label: "None" },
      { value: "cdk" as const, label: "AWS CDK", hint: "forces TypeScript" },
      { value: "cloudformation" as const, label: "CloudFormation" },
      { value: "terraform" as const, label: "Terraform" },
    ],
  });
  handleCancel(iac);

  return {
    projectName: (projectName as string).trim(),
    languages: languages as WizardAnswers["languages"],
    frontend: frontend as WizardAnswers["frontend"],
    iac: iac as WizardAnswers["iac"],
  };
}
