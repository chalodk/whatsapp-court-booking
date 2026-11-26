# Kapso Setup

How this workspace talks to WhatsApp. The skills teach the commands. This file says which connection to use. Do not put API keys in any markdown file.

## Already bundled

These folders are copied from [gokapso/agent-skills](https://github.com/gokapso/agent-skills):

- `skills/integrate-whatsapp` for numbers, webhooks, templates, and Flows
- `skills/automate-whatsapp` for workflows and functions
- `skills/observe-whatsapp` for logs, delivery, and number health

## CLI

Install the Kapso CLI and log in before stage 02:

```bash
curl -fsSL https://kapso.ai/install.sh | bash
kapso login
kapso status
```

Use the CLI when the agent has a terminal. Use Project MCP when the agent should call Kapso without a shell.

## Project MCP

Endpoint: `https://api.kapso.ai/mcp`

The key stays in the environment as `KAPSO_API_KEY`. Pass it as a header. Do not write it into the repo.

```bash
claude mcp add --transport http kapso https://api.kapso.ai/mcp \
  --header "Authorization: Bearer $KAPSO_API_KEY"
```

Browser sign-in is the other option: configure the URL, sign in, and pick the project.

{{?DOCS_MCP}}

## Docs MCP

Endpoint: `https://docs.kapso.ai/mcp`

This searches Kapso documentation only. It does not send messages or change the project.

{{/DOCS_MCP}}

## Who uses what

| Stage | Use |
|-------|-----|
| Messages | `integrate-whatsapp` and Project MCP to create templates and Flows |
| Send test | `automate-whatsapp` to publish the fill workflow, `observe-whatsapp` to check the test |
| Agenda | Project MCP to read replies and send the daily or hourly Flow |

## Publish rule

Publishing a Flow on Meta is irreversible. Create it first. Publish only after the admin approves the wording on the Messages screen.
