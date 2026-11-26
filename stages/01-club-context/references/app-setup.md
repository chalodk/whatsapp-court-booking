# App Setup

Install these before the Club screen can open. Stage 01 needs this. Later stages use the same app.

## Node.js

Install Node.js 20 or newer. The UI is Next.js.

```bash
node -v
```

The command prints a version of 20 or higher.

## Python

Install Python 3.11 or newer. The API is FastAPI. Stage 03 also uses Python to read spreadsheets.

```bash
python3 --version
```

## Supabase

Create one Supabase project for this club. Turn on Supabase Auth. The API checks the user token with Supabase Auth on every route that needs the admin.

Keep the project URL and the keys in environment variables. Do not write them into markdown or source files that get committed.

The database mirrors `club-base.json` and `players.json`. The column meanings stay in `shared/club-schema.md` and `shared/player-schema.md`.

## Check

- `node -v` shows 20 or newer
- `python3 --version` shows 3.11 or newer
- The Club screen opens and asks the admin to sign in
