# WhatsApp Court Booking

El admin del club deja lista la base de canchas, los mensajes de WhatsApp, la nómina y el plan de envío. Este workspace es el software: pantallas, API y datos. Kapso envía WhatsApp.

## Folder Map

```
whatsapp-court-booking/
├── CLAUDE.md              (you are here)
├── CONTEXT.md             (start here for task routing)
├── setup/                 (onboarding questionnaire)
├── prerequisites/         (which tools to install, and where)
├── club-context/          (identity of this club)
├── skills/                (Kapso skills)
├── shared/                (rules used by more than one stage)
└── stages/
    ├── 01-club-context/   (texto libre a JSON del club)
    ├── 02-messages/       (plantillas y Flows)
    ├── 03-players/        (nómina desde Excel o CSV)
    └── 04-send-test/      (prueba y horario en vivo)
```

## Triggers

| Keyword | Action |
|---------|--------|
| `setup` | Run onboarding questionnaire |
| `status` | Show pipeline completion for all stages |

Scan `stages/*/output/`. A stage is COMPLETE when that folder has a file other than `.gitkeep`. Otherwise it is PENDING. Stages 02 and 03 both follow 01. Stage 04 follows 02 and 03.

```
Pipeline Status: whatsapp-court-booking

  [01-club-context] --> [02-messages] --> [04-send-test]
                    \-> [03-players] -/
      STATUS              STATUS              STATUS
```

## Routing

| Task | Go To |
|------|-------|
| Describir el club y dejar la base JSON | `stages/01-club-context/CONTEXT.md` |
| Escribir plantillas y Flows | `stages/02-messages/CONTEXT.md` |
| Cargar jugadores desde Excel o CSV | `stages/03-players/CONTEXT.md` |
| Probar un envío y activar el horario | `stages/04-send-test/CONTEXT.md` |

## What to Load

| Task | Load These | Do NOT Load |
|------|-----------|-------------|
| Club base | `club-context/identity.md`, `shared/club-schema.md`, `shared/booking-rules.md`, `stages/01-club-context/references/app-setup.md` | Stages 02 to 04, `skills/` |
| Messages | Stage 01 output, `shared/message-voice.md` (Hard Constraints through Pacing), the chosen section of `shared/flow-modes.md`, `shared/value-framework.md`, `shared/kapso-setup.md`, `skills/integrate-whatsapp/SKILL.md` | Stages 03 and 04, `skills/observe-whatsapp/` |
| Players | Stage 01 output, `shared/player-schema.md`, `stages/03-players/references/spreadsheet-setup.md` | Stages 02 and 04, `skills/` |
| Send test | Outputs of stages 01, 02, and 03, the chosen section of `shared/flow-modes.md`, `shared/kapso-setup.md`, `skills/automate-whatsapp/SKILL.md`, `skills/observe-whatsapp/SKILL.md` | Voice drafting, club schema authoring |

## Stage Handoffs

Each stage writes to its own `output/` folder. The next stage reads that file. If you edit an output file, the next stage picks up your edits.

The agenda screen reads the send plan after stage 04. It is a screen, not a stage.
