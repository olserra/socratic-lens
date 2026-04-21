# SocraticLens-MCP

The metacognitive layer for Human-AI collaboration.

SocraticLens is an MCP (Model Context Protocol) server that transforms opaque reasoning text into a structured, auditable view.

It exposes one MCP tool, `analyze_reasoning`, which classifies content into:

- Core Premises
- Assumptions to Verify
- Potential Logical Risks

The output is optimized for readability in markdown-based artifact windows.

## Tech Stack

- Node.js 20+
- TypeScript
- @modelcontextprotocol/sdk
- Vercel Serverless Functions (for HTTP deploy)

## Features Implemented

- MCP server over stdio (for local Claude Desktop integration)
- MCP server over HTTP streamable transport (for Vercel)
- Heuristic Socratic parser with metacognitive classification
- Markdown table output for high-signal review
- Health endpoint for production monitoring

## Architecture

This repository follows a shared-core + adapters structure (similar to multi-platform plugin projects):

- Core logic: `src/core/` (reasoning classification + markdown rendering)
- MCP adapter: `src/adapters/mcp/` (tool registration and schema)
- Runtime entrypoints:
  - `src/index.ts` for stdio clients (Claude Desktop/local)
  - `api/mcp.ts` for HTTP MCP clients (remote)

Detailed notes: `docs/ARCHITECTURE.md`

## Quick Start

### 1. Install and build

```bash
npm install
npm run build
```

### 2. Run locally (stdio)

```bash
npm start
```

### 3. Claude Desktop configuration

Add to `claude_desktop_config.json`:

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

## MCP Tool

### analyze_reasoning

Input:

- `raw_reasoning`: string
- `analysis_mode` (optional): `"explainability" | "risk_review"`

Output:

- Markdown analysis table with columns:
  - Category
  - Statement
  - Confidence
  - Why this label?

Behavior by mode:

- `explainability` (default): orders results as 🔵 Core Premises -> 🟡 Assumptions -> 🔴 Risks
- `risk_review`: orders results as 🔴 Risks -> 🟡 Assumptions -> 🔵 Core Premises

### Example Tool Calls

Explainability-first (default):

```json
{
  "tool": "analyze_reasoning",
  "arguments": {
    "raw_reasoning": "Revenue dropped 12% in Q2 while churn increased in the SMB segment. If support latency keeps rising, churn may accelerate next quarter."
  }
}
```

Risk-first review:

```json
{
  "tool": "analyze_reasoning",
  "arguments": {
    "raw_reasoning": "Everyone will migrate quickly once we launch feature X, so retention will certainly recover in one month.",
    "analysis_mode": "risk_review"
  }
}
```

## Deploy on Vercel

This project includes:

- `api/mcp.ts` (MCP HTTP endpoint)
- `api/health.ts` (health check)
- `vercel.json` route mapping

After linking project on Vercel:

```bash
vercel --prod
```

Default routes:

- `/` -> health
- `/mcp` -> MCP endpoint

Important:

- `/mcp` is an MCP protocol endpoint, not a human-facing web page.
- If you open it in a browser (or plain `curl`), a `406 Not Acceptable` is expected unless the client sends `Accept: text/event-stream`.
- For quick human checks, use `/` (health) instead.

Example protocol-aware check:

```bash
curl -i https://socratic-lens.vercel.app/mcp -H "Accept: text/event-stream"
```

## Do We Need Vercel?

No. Most MCP setups (especially Claude Desktop) run over local stdio and do not require Vercel.

Use Vercel only if you want a remote/shared MCP endpoint for multiple clients.

## Using with Other LLM Clients

- Claude Desktop: use local stdio process (recommended default).
- Codex or other MCP-capable clients: use either local stdio or remote `/mcp` endpoint.
- If your client supports MCP over HTTP/SSE, point it to the deployed endpoint.

Client setup guide: `docs/CLIENT-INTEGRATIONS.md`

Config templates:

- `examples/mcpServers.local.json`
- `examples/mcpServers.remote.json`

## Development Scripts

- `npm run dev`: run TypeScript directly
- `npm run build`: compile to `build/`
- `npm run check`: typecheck only

## License

MIT
