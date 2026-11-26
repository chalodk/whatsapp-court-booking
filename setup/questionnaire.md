# Onboarding Questionnaire

Read this file when the user types "setup". Ask ALL questions in a single conversational pass. The user should be able to answer everything in one message. Collect answers. Replace placeholders across the specified files. Do not edit anything inside `skills/`. Those files use Kapso runtime tokens. They are not onboarding placeholders.

After all replacements, scan every markdown file outside `skills/` for remaining `{{` patterns. If any remain, ask for the missing info. Onboarding is complete only when that scan is clean.

### Q1: ¿Cómo se llama el club?
- Placeholder: `{{CLUB_NAME}}`
- Files: `club-context/identity.md`, `shared/message-voice.md`
- Type: free text
- Default: Club Deportivo

### Q2: ¿En qué zona horaria están las canchas?
- Placeholder: `{{TIMEZONE}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: America/Santiago

### Q3: ¿En qué idioma deben ir los mensajes?
- Placeholder: `{{LOCALE}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: español de Chile
- Derived: write a locale code, not the sentence. "español de Chile" becomes `es-CL`. "español" becomes `es`. "English" becomes `en`.

### Q4: ¿Cuál es el WhatsApp del admin que recibe la prueba?
- Placeholder: `{{ADMIN_PHONE}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: +56911111111

### Q5: ¿Qué deportes hay, y cuántas canchas tiene cada uno?
- Placeholder: `{{SPORTS}}`, `{{COURT_COUNTS}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: Pádel: 2 canchas. Fútbol: 1 cancha.

### Q6: ¿Qué días y en qué horario abre el club?
- Placeholder: `{{OPERATING_HOURS}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: Lunes a viernes de 8:00 a 23:00. Sábado y domingo de 9:00 a 18:00.

### Q7: ¿Hay cierres, mantención o reglas de quién puede reservar?
- Placeholder: `{{RESTRICTIONS}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: Ninguna

### Q8: Cuando hay una hora libre, ¿a quién se le ofrece primero, y cómo corrige el admin?
- Placeholder: `{{FILL_POLICY}}`
- Files: `club-context/identity.md`
- Type: free text
- Default: Primero quien confirma en el mensaje. El admin puede asignar una hora libre diciéndolo en la agenda.

### Q9: Pega dos mensajes que sí suenan al club, y dos que no.
- Placeholder: `{{VOICE_RIGHT_EXAMPLE}}`, `{{VOICE_WRONG_EXAMPLE}}`
- Files: `shared/message-voice.md`
- Type: free text
- Default: Bien: "Hola, hay pádel libre a las 19. Elige cancha en el mensaje." Mal: "Buenas, cualquier cosa me escribes y vemos."
- Derived: `{{MESSAGE_TONE}}` in `shared/message-voice.md`. One sentence on pacing, taken from the messages that sound right. Do not ask the admin to describe the tone.

### Q10: ¿Cómo se llaman las columnas de nombre, teléfono y deporte en la planilla?
- Placeholder: `{{PLAYER_SHEET_COLUMNS}}`
- Files: `shared/player-schema.md`
- Type: free text
- Default: nombre, telefono, deporte

### Q11: ¿El jugador ve los horarios al abrir el mensaje, o el club manda un resumen cada hora?
- Placeholder: `{{FLOW_MODE}}`
- Files: `shared/flow-modes.md`
- Type: selection
- Options: dynamic (un Flow al día, con horarios al abrirlo), hourly (un resumen cada hora, con todas las canchas)
- Default: dynamic
- If dynamic: write `dynamic` and remove the `{{?HOURLY_DIGEST}}` section in `shared/flow-modes.md`
- If hourly: write `hourly` and remove the `{{?DYNAMIC_FLOW}}` section in `shared/flow-modes.md`

### Q12: ¿Conectamos también el MCP que solo busca la documentación de Kapso?
- Files: `shared/kapso-setup.md`
- Type: yes/no
- Default: no
- If NO: remove the `{{?DOCS_MCP}}` section in `shared/kapso-setup.md`
- If YES: keep that section
- Project MCP stays either way. It is how the workspace sends WhatsApp.

---

## After Onboarding

Voice is a two-pass step. After the answers are in the files, show the admin Hard Constraints, Sentence Rules, and Pacing from `shared/message-voice.md`. Apply their edits before those sections are final.

Then tell them the club is configured and the next step is the Club screen: `stages/01-club-context/CONTEXT.md`.
