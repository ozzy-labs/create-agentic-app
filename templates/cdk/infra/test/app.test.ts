import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { describe, expect, it } from "vitest";
import { AppStack } from "../lib/app-stack.js";

describe("AppStack", () => {
  it("creates a stack", () => {
    const app = new cdk.App();
    const stack = new AppStack(app, "TestStack");
    const template = Template.fromStack(stack);
    expect(template).toBeDefined();
  });
});
