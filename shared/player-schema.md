# Player Schema

Shape of `players.json`, and the columns expected in the spreadsheet.

## Sheet columns

{{PLAYER_SHEET_COLUMNS}}

The sheet must provide a name, a phone, and at least one sport. Extra columns are kept on the player as notes. They are not required.

## Record

| Field | Meaning |
|-------|---------|
| `name` | How the admin and the messages refer to the player |
| `phone` | WhatsApp number, with country code |
| `sports` | One or more sports that exist in `club-base.json` |
| `notes` | Optional text from extra columns |

## Shape

```json
{
  "players": [
    {
      "name": "",
      "phone": "",
      "sports": [],
      "notes": ""
    }
  ]
}
```

## Rules

- Drop a row that has no name or no phone, and show it to the admin before saving.
- Drop a sport that is not in the club base, and show that row to the admin.
- One phone belongs to one player. If the same phone appears twice, keep one row and merge the sports.
