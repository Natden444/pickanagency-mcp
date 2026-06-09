# Pick an Agency — MCP Server

[**Pick an Agency**](https://www.pickanagency.com) is a free directory of **47,000+ marketing agencies** with real client reviews and a free AI matching tool. This [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server lets any AI agent — Claude, ChatGPT, Cursor, Gumloop, and more — search the directory and get matched with fitted agencies, directly in conversation.

> Find the right marketing agency, backed by real reviews → [pickanagency.com](https://www.pickanagency.com)

## Endpoint

Hosted, public, read-only. **No API key required.** Streamable HTTP:

```
https://www.pickanagency.com/api/mcp/mcp
```

## Tools

| Tool | What it does |
|------|--------------|
| `search_agencies` | Search/filter the directory by free-text query, service (SEO, paid ads, social…), country, city, industry, and minimum rating. |
| `match_agencies` | The **"Get Matched"** engine: give a brief (services, location, budget, industry) and get a ranked shortlist of fitted agencies. |
| `get_agency` | A single agency's full profile (description, rating, services, website, recent reviews) by slug. |

Every result links back to the agency's profile on [pickanagency.com](https://www.pickanagency.com/agencies).

## Connect it

### Claude Code
```bash
claude mcp add --transport http pick-an-agency https://www.pickanagency.com/api/mcp/mcp
```

### Cursor — `~/.cursor/mcp.json`
```json
{
  "mcpServers": {
    "pick-an-agency": {
      "url": "https://www.pickanagency.com/api/mcp/mcp"
    }
  }
}
```

### Claude Desktop / Claude.ai
**Settings → Connectors → Add custom connector** → paste the endpoint URL above.

### Run locally (stdio)
Prefer a local server? This package is a thin stdio proxy to the hosted endpoint:
```bash
npx -y github:Natden444/pickanagency-mcp
```
Or in any MCP client config:
```json
{ "mcpServers": { "pick-an-agency": { "command": "npx", "args": ["-y", "github:Natden444/pickanagency-mcp"] } } }
```

## Example prompts

- *"Find the top SEO agencies in the US."*
- *"Match me with a social media marketing agency in Paris, budget around $5k/month."*
- *"Tell me about the agency at slug `agence-pickers-paris-paris`."*

The agent calls the tools and answers with real agencies and their [pickanagency.com](https://www.pickanagency.com) profile links.

## About

[Pick an Agency](https://www.pickanagency.com) helps companies find the right marketing agency, backed by real client reviews and free AI matching ("Get Matched" returns 5 fitted agencies in about 60 seconds). Built by Nathan Denier.

- Website: <https://www.pickanagency.com>
- Browse agencies: <https://www.pickanagency.com/agencies>
- Get Matched: <https://www.pickanagency.com/get-matched>

## License

MIT © Pick an Agency
