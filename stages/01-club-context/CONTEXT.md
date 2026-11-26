# Club Context

Turn the admin's description into the club base JSON.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Admin | Club screen | Full description | Sports, courts, hours, restrictions, fill policy |
| Context | `../../club-context/identity.md` | Full file | Onboarded club facts to start from |
| Shared | `../../shared/club-schema.md` | Full file | Valid JSON shape |
| Shared | `../../shared/booking-rules.md` | Full file | Priority, conflicts, admin override |
| Reference | `references/app-setup.md` | Full file | Node, Python, and Supabase must be installed |

## Process

1. Read the schema, the booking rules, and the club identity.
2. Draft `club-base.json` from the admin's words and the identity file.
3. Show courts, hours, restrictions, and the fill policy on the Club screen.
4. Apply the admin's corrections until they confirm.
5. Run the audit.
6. Save the confirmed JSON to `output/club-base.json`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 3 | Courts, hours, restrictions, and fill policy | Confirm or correct before any message is written |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Schema | The JSON matches every required field in `shared/club-schema.md` |
| Courts | Every sport has at least one court |
| Hours | Every operating hour can be read as a start and an end |
| Fill policy | A priority and an admin override are both present |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Club base | `output/club-base.json` | JSON per `shared/club-schema.md` |
