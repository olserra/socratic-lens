import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_: VercelRequest, res: VercelResponse): void {
  res.status(200).json({
    service: "socratic-lens-mcp",
    status: "ok",
    timestamp: new Date().toISOString()
  });
}
