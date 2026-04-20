import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createSocraticLensServer } from "./server.js";

async function main(): Promise<void> {
  const server = createSocraticLensServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error("Failed to start SocraticLens MCP server:", error);
  process.exit(1);
});
