# Client Integrations

This project is an MCP server consumed via local stdio.

## Recommended Integration Mode

1. Local stdio (most reliable)

- Best for Claude Desktop and local developer workflows.
- Uses local process execution.

## Claude Desktop

Use stdio with the local build:

1. Build project:

```bash
npm install
npm run build
```

1. Add server config to your Claude Desktop MCP settings:

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

## OpenCode

Use the same MCP server definitions from `examples/` in OpenCode's MCP configuration.

- Use local stdio.

Because OpenCode versions can vary, map the values to its MCP config keys (`command` + `args`).

## Ollama

Ollama itself is a model runtime, not an MCP client.

To use SocraticLens with Ollama, connect through an MCP-capable host layer (for example, a coding client or UI that supports MCP tools and can call Ollama models).

Practical pattern:

1. Host LLM with Ollama.
2. Run SocraticLens as local MCP stdio server.
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
