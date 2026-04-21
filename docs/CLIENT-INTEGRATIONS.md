# Client Integrations

This project is an MCP server and can be consumed by any client that supports MCP over stdio or HTTP.

## Recommended Integration Modes

1. Local stdio (most reliable)
- Best for Claude Desktop and local developer workflows.
- Uses local process execution.

2. Remote HTTP endpoint
- Best when you want one hosted endpoint for multiple clients.
- Uses `https://socratic-lens.vercel.app/mcp`.

## Claude Desktop

Use stdio with the local build:

1. Build project:

```bash
npm install
npm run build
```

2. Add server config to your Claude Desktop MCP settings:

```json
{
  "mcpServers": {
    "socratic-lens": {
      "command": "node",
      "args": ["/absolute/path/to/socratic-lens/build/src/index.js"]
    }
  }
}
```

Template file: `examples/mcpServers.local.json`

## Codex and other MCP-capable coding clients

Many coding clients use an `mcpServers`-style schema.

- Local process template: `examples/mcpServers.local.json`
- Remote endpoint template: `examples/mcpServers.remote.json`

If your client supports MCP over HTTP/SSE, use:

- `https://socratic-lens.vercel.app/mcp`

Note: If you open `/mcp` in a browser without MCP headers, you may see `406 Not Acceptable`. That is expected for protocol endpoints.

## OpenCode

Use the same MCP server definitions from `examples/` in OpenCode's MCP configuration.

- Prefer local stdio for development.
- Use remote URL for shared access.

Because OpenCode versions can vary, map the values to its MCP config keys (`command` + `args` for local, or `url` for remote).

## Ollama

Ollama itself is a model runtime, not an MCP client.

To use SocraticLens with Ollama, connect through an MCP-capable host layer (for example, a coding client or UI that supports MCP tools and can call Ollama models).

Practical pattern:

1. Host LLM with Ollama.
2. Run SocraticLens as MCP server (local or remote).
3. Use an MCP-capable orchestrator/client that can access both.

## Tool Contract

SocraticLens exposes one MCP tool:

- `analyze_reasoning`

Input:

- `raw_reasoning` (string)
- `analysis_mode` (optional): `explainability` or `risk_review`

Output:

- Markdown table with:
  - Core Premises
  - Assumptions to Verify
  - Potential Logical Risks
