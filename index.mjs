#!/usr/bin/env node
/**
 * Pick an Agency MCP — stdio proxy.
 * Re-exposes the hosted Streamable-HTTP server (pickanagency.com/api/mcp/mcp)
 * over stdio so it's installable via `npx` and runnable by registries/clients
 * that expect a local server. All logic lives on the hosted endpoint.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const REMOTE = process.env.PICK_MCP_URL || "https://www.pickanagency.com/api/mcp/mcp";

const client = new Client({ name: "pickanagency-proxy", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL(REMOTE)));

const server = new Server({ name: "pick-an-agency", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: (await client.listTools()).tools }));
server.setRequestHandler(CallToolRequestSchema, (req) =>
  client.callTool({ name: req.params.name, arguments: req.params.arguments ?? {} }),
);
await server.connect(new StdioServerTransport());
console.error("Pick an Agency MCP (stdio proxy) connected to", REMOTE);
