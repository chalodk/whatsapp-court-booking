# Stack

What the app is built with. Values for this club live in `club-context/identity.md`. Code reads that file. It does not copy the club name, the hours, or the phone into source files.

| Layer | Choice |
|-------|--------|
| UI | Next.js and React |
| API | FastAPI |
| Data and auth | Supabase. Auth is Supabase Auth |
| Server cache | React Query on the client |
| Client state | Zustand |
| WhatsApp | Kapso. See `kapso-setup.md` |
| Tests | Pytest for the API. Jest and React Testing Library for the UI |
| Python style | Ruff |
| JS style | ESLint and Prettier |

## Constants

`constants.md` is the list of keys the app is allowed to read. If a value is not listed there, it does not belong in shared config.
