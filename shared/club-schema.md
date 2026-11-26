# Club Schema

Shape of `club-base.json`. Current values live in `club-context/identity.md`. This file defines the fields, not the club's answers.

## Required fields

| Field | Meaning |
|-------|---------|
| `club_name` | Name the messages use |
| `timezone` | Zone for hours and send times |
| `locale` | Language of the admin and the messages |
| `admin_phone` | WhatsApp number that receives the test and can override a booking |
| `sports` | List of sports. Each sport has a `name` and a `courts` list |
| `courts` | Each court has a `name` unique inside its sport |
| `hours` | Each row has `day`, `open`, and `close` |
| `restrictions` | Closures, maintenance, member-only windows |
| `fill_policy` | `priority` plus `admin_override` |

## Shape

```json
{
  "club_name": "",
  "timezone": "",
  "locale": "",
  "admin_phone": "",
  "sports": [
    {
      "name": "",
      "courts": [{ "name": "" }]
    }
  ],
  "hours": [
    { "day": "", "open": "", "close": "" }
  ],
  "restrictions": [],
  "fill_policy": {
    "priority": "",
    "admin_override": true
  }
}
```

## Rules

- Every sport has at least one court.
- `open` and `close` are times the agenda can place on a clock.
- `admin_override` stays true. The admin can assign a player to a free slot in plain language.
- Bookings are not part of this file. The agenda stores them on top of this base.
