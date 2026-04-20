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

Output:

- Markdown analysis table with columns:
  - Category
  - Statement
  - Confidence
  - Why this label?

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

## Development Scripts

- `npm run dev`: run TypeScript directly
- `npm run build`: compile to `build/`
- `npm run check`: typecheck only

## License

MIT
