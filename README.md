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

## Development Scripts

- `npm run dev`: run TypeScript directly
- `npm run build`: compile to `build/`
- `npm run check`: typecheck only

## License

MIT
