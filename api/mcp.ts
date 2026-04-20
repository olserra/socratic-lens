import type { VercelRequest, VercelResponse } from "@vercel/node";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createSocraticLensServer } from "../src/server.js";

export const config = {
  api: {
    bodyParser: false
  }
};

const sessions = new Map<string, StreamableHTTPServerTransport>();

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    let transport: StreamableHTTPServerTransport;

    if (sessionId && sessions.has(sessionId)) {
      transport = sessions.get(sessionId)!;
    } else {
      transport = new StreamableHTTPServerTransport({
        enableJsonResponse: true,
        sessionIdGenerator: () => crypto.randomUUID(),
        onsessioninitialized: (id) => {
          sessions.set(id, transport);
        }
      });

      transport.onclose = () => {
        if (transport.sessionId) {
          sessions.delete(transport.sessionId);
        }
      };

      const server = createSocraticLensServer();
      await server.connect(transport);
    }

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP HTTP handler failure:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
}
