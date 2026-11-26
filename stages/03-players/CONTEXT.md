# Players

Load the roster from an Excel file or a CSV and confirm it with the admin.

## Inputs

| Source | File/Location | Section/Scope | Why |
|--------|--------------|---------------|-----|
| Admin | Players screen | `.xlsx` or CSV | Roster |
| Previous stage | `../01-club-context/output/club-base.json` | Sports | Reject a sport the club does not offer |
| Shared | `../../shared/player-schema.md` | Full file | Name, phone, and sport columns |
| Reference | `references/spreadsheet-setup.md` | Full file | How to read Excel and CSV |

## Process

1. Read the sheet and the player schema.
2. Normalize phone and sport. Flag rows whose sport is not in the club base.
3. Show the roster and the flagged rows on the Players screen.
4. Apply the admin's corrections until they confirm.
5. Run the audit.
6. Save `output/players.json`.

## Checkpoints

| After Step | Agent Presents | Human Decides |
|------------|---------------|---------------|
| 3 | Roster plus flagged rows | Confirm who is included |

## Audit

| Check | Pass Condition |
|-------|---------------|
| Required fields | Every kept player has a name, a phone, and at least one club sport |
| Sports | Every sport on a kept row exists in `club-base.json` |
| Schema | The file matches `shared/player-schema.md` |

## Outputs

| Artifact | Location | Format |
|----------|----------|--------|
| Roster | `output/players.json` | JSON per `shared/player-schema.md` |
