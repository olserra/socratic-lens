# Architecture

SocraticLens follows a shared-core + platform-adapter architecture.

## Layers

1. Core (`src/core/`)

- Pure reasoning logic and rendering.
- No MCP or framework dependencies.
- Reusable by MCP, plugins, or custom wrappers.

1. Adapters (`src/adapters/`)

- Platform-specific glue for exposing core capabilities.
- Current adapter: MCP tool registration (`src/adapters/mcp/`).

1. Entrypoints

- Stdio MCP server for local clients: `src/index.ts`

## Why this shape

- Makes it easier to support multiple agent runtimes (Claude Desktop, Codex workflows, OpenCode, custom clients).
- Keeps business logic testable and independent from transport/runtime concerns.
- Minimizes lock-in to one plugin or hosting model.

## Client compatibility

- Claude Desktop: uses stdio MCP process (`npm start` / `build/src/index.js`).
- Codex and OpenCode workflows: use stdio MCP process through client MCP settings.
