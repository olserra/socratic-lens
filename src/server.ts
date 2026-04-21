import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAnalyzeReasoningTool } from "./adapters/mcp/registerAnalyzeReasoningTool.js";

export function createSocraticLensServer(): McpServer {
  const server = new McpServer({
    name: "socratic-lens",
    version: "0.1.0",
    description:
      "Metacognitive MCP server that classifies reasoning into premises, assumptions, and logical risks."
  });

  registerAnalyzeReasoningTool(server);

  return server;
}
