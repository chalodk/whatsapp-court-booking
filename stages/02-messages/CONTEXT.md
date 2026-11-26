# Messages

Write the greeting, the invitation, and the WhatsApp Flow, then publish them in Kapso after the admin approves.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Previous stage | `../01-club-context/output/club-base.json` | Full file | Sports, courts, and hours the Flow must show |
| Shared | `../../shared/message-voice.md` | "Hard Constraints", "Sentence Rules", and "Pacing" | Tone |
| Shared | `../../shared/flow-modes.md` | The section for the chosen mode | Daily endpoint Flow, or hourly static summary |
| Shared | `../../shared/value-framework.md` | Full file | Quality floor for the copy |
| Shared | `../../shared/kapso-setup.md` | Full file | CLI and Project MCP |
| Skill | `../../skills/integrate-whatsapp/SKILL.md` | Index, then Flow and template rules | Publish in Kapso |

## Process

1. Read the club base, the voice rules, and the chosen flow mode.
2. Draft the greeting, the invitation, and the Flow for that mode.
3. Show the wording and the screens on the Messages screen.
4. After approval, create the templates and the Flow in Kapso. Publish the Flow only then.
5. Run the audit.
6. Save `output/message-pack.md` with template names, screens, and Kapso ids.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 3 | Wording and Flow screens | Approve or edit before anything is published |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Value floor | The pack hits every value type in `shared/value-framework.md` |
| Voice | No hard-constraint violation in `shared/message-voice.md` |
| Mode | The pack matches the selected flow mode and leaves the other mode out |
| Ids | Every template and the Flow have a Kapso id |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Message pack | `output/message-pack.md` | Templates, Flow screens, Kapso ids |
