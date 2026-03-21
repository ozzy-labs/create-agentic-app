import * as p from "@clack/prompts";
import pc from "picocolors";
import { t } from "./i18n/index.js";
import type { WizardAnswers } from "./types.js";

function handleCancel(value: unknown): void {
  if (p.isCancel(value)) {
    p.cancel(t("cancel"));
    process.exit(0);
  }
}

export async function runWizard(defaultName?: string): Promise<WizardAnswers> {
  p.intro(pc.bold(t("intro")));

  const projectName = await p.text({
    message: t("wizard.projectName.message"),
    placeholder: t("wizard.projectName.placeholder"),
    initialValue: defaultName ?? "",
    validate(value) {
      if (!value.trim()) return t("wizard.projectName.required");
      if (!/^[a-z0-9][a-z0-9._-]*$/i.test(value.trim())) {
        return t("wizard.projectName.invalid");
      }
    },
  });
  handleCancel(projectName);

  const languages = await p.multiselect({
    message: `${t("wizard.languages.message")} ${pc.dim(t("wizard.languages.hint"))}`,
    options: [
      { value: "typescript" as const, label: t("wizard.languages.typescript.label") },
      { value: "python" as const, label: t("wizard.languages.python.label") },
    ],
    required: false,
  });
  handleCancel(languages);

  const frontend = await p.select({
    message: `${t("wizard.frontend.message")} ${pc.dim(t("wizard.frontend.hint"))}`,
    options: [
      { value: "none" as const, label: t("wizard.frontend.none.label") },
      {
        value: "react" as const,
        label: t("wizard.frontend.react.label"),
        hint: t("wizard.frontend.react.hint"),
      },
    ],
  });
  handleCancel(frontend);

  const clouds = await p.multiselect({
    message: `${t("wizard.clouds.message")} ${pc.dim(t("wizard.clouds.hint"))}`,
    options: [
      { value: "aws" as const, label: t("wizard.clouds.aws.label") },
      { value: "azure" as const, label: t("wizard.clouds.azure.label") },
    ],
    required: false,
  });
  handleCancel(clouds);

  const selectedClouds = clouds as WizardAnswers["clouds"];
  let iac: WizardAnswers["iac"] = [];

  if (selectedClouds.length > 0) {
    type IacValue = "cdk" | "cloudformation" | "terraform" | "bicep";
    const iacOptions: Array<{ value: IacValue; label: string; hint?: string }> = [];

    if (selectedClouds.includes("aws")) {
      iacOptions.push(
        { value: "cdk", label: t("wizard.iac.cdk.label"), hint: t("wizard.iac.cdk.hint") },
        { value: "cloudformation", label: t("wizard.iac.cloudformation.label") },
      );
    }
    if (selectedClouds.includes("aws") || selectedClouds.includes("azure")) {
      // Avoid duplicate if both clouds selected
      if (!iacOptions.some((o) => o.value === "terraform")) {
        iacOptions.push({ value: "terraform", label: t("wizard.iac.terraform.label") });
      }
    }
    if (selectedClouds.includes("azure")) {
      iacOptions.push({ value: "bicep", label: t("wizard.iac.bicep.label") });
    }

    if (iacOptions.length > 0) {
      const iacAnswer = await p.multiselect({
        message: `${t("wizard.iac.message")} ${pc.dim(t("wizard.iac.hint"))}`,
        options: iacOptions,
        required: false,
      });
      handleCancel(iacAnswer);
      iac = iacAnswer as WizardAnswers["iac"];
    }
  }

  return {
    projectName: (projectName as string).trim(),
    languages: languages as WizardAnswers["languages"],
    frontend: frontend as WizardAnswers["frontend"],
    clouds: selectedClouds,
    iac,
  };
}
