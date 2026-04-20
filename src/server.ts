import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { analyzeReasoning, renderMarkdownTable } from "./analyzer.js";

export function createSocraticLensServer(): McpServer {
  const server = new McpServer({
    name: "socratic-lens",
    version: "0.1.0",
    description:
      "Metacognitive MCP server that classifies reasoning into premises, assumptions, and logical risks."
  });

  server.registerTool(
    "analyze_reasoning",
    {
      title: "Analyze Reasoning",
      description:
        "Transforms raw reasoning into a metacognitive table with categories: Core Premises, Assumptions to Verify, and Potential Logical Risks.",
      inputSchema: {
        raw_reasoning: z
          .string()
          .min(20, "Please provide at least 20 characters of reasoning text.")
          .describe("Raw text representing the model's thought process."),
        analysis_mode: z
          .enum(["explainability", "risk_review"])
          .optional()
          .describe(
            "Optional ordering mode. Use 'explainability' (default) for premise-first flow, or 'risk_review' for risk-first flow."
          )
      }
    },
    async ({ raw_reasoning, analysis_mode }) => {
      const mode = analysis_mode ?? "explainability";
      const items = analyzeReasoning(raw_reasoning, mode);
      const markdown = renderMarkdownTable(items, mode);

      return {
        content: [
          {
            type: "text",
            text: markdown
          }
        ]
      };
    }
  );

  return server;
}
