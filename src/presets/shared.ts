import type { McpServerConfig } from "../types.js";

/** Default MCP servers shared by all agent presets. */
export const DEFAULT_MCP_SERVERS: Record<string, McpServerConfig> = {
  context7: {
    command: "npx",
    args: ["-y", "@upstash/context7-mcp@latest"],
  },
  fetch: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-fetch"],
  },
};
