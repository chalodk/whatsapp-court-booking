# Send Test

Send one test to the admin, then turn on the live schedule and the fill workflow.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `../01-club-context/output/club-base.json` | Full file | Hours and fill policy |
| Previous stage | `../02-messages/output/message-pack.md` | Full file | What gets sent |
| Previous stage | `../03-players/output/players.json` | Full file | Who receives it |
| Shared | `../../shared/flow-modes.md` | The section for the chosen mode | One send a day, or an hourly summary |
| Shared | `../../shared/kapso-setup.md` | Full file | CLI and Project MCP |
| Skill | `../../skills/automate-whatsapp/SKILL.md` | Index, then workflows | Fill workflow |
| Skill | `../../skills/observe-whatsapp/SKILL.md` | Index, then delivery and logs | Check that the test arrived |

## Process

1. Read the club base, the message pack, and the roster.
2. Draft the plan: recipients, clock time, and flow mode.
3. Send one test to the admin phone.
4. Check delivery in the Kapso logs.
5. Show the result on the Sends screen.
6. After approval, activate the fill workflow and the live schedule.
7. Run the audit.
8. Save `output/send-plan.md`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 5 | Recipients, schedule, and test result | Approve the live schedule |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Test | The test send has a Kapso message id and a delivery status |
| Recipients | Every recipient is in `players.json` |
| Mode | The schedule matches the selected flow mode |
| Workflow | The fill workflow id is recorded |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Send plan | `output/send-plan.md` | Schedule, recipients, test result, workflow id |
