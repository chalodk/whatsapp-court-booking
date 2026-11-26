# WhatsApp Court Booking

Agendamiento de canchas por WhatsApp. El admin confirma cada corte en la pantalla antes de seguir.

## Task Routing

| Task Type | Go To | Description |
|-----------|-------|-------------|
| Base del club | `stages/01-club-context/CONTEXT.md` | Texto libre a JSON de canchas, horarios y llenado |
| Mensajes | `stages/02-messages/CONTEXT.md` | Plantillas y Flows publicados en Kapso |
| Jugadores | `stages/03-players/CONTEXT.md` | Nómina desde Excel o CSV |
| Prueba y envío | `stages/04-send-test/CONTEXT.md` | Ensayo al admin y horario en vivo |

## Shared Resources

| Resource | Location | Contains |
|----------|----------|----------|
| Identidad del club | `club-context/CONTEXT.md` | Nombre, zona, idioma, teléfono, deportes, horarios |
| Herramientas | `prerequisites/CONTEXT.md` | Node, Python, Supabase, Kapso, y la guía de cada una |
| Reglas compartidas | `shared/` | Esquema, llenado, voz, modos de Flow, jugadores, pantallas, Kapso |
| integrate-whatsapp | `skills/integrate-whatsapp/SKILL.md` | Números, webhooks, plantillas y Flows |
| automate-whatsapp | `skills/automate-whatsapp/SKILL.md` | Workflows, triggers y functions |
| observe-whatsapp | `skills/observe-whatsapp/SKILL.md` | Logs, entrega y salud del número |
