# Spreadsheet Setup

Stage 03 reads `.xlsx` and CSV with Python. Install this in the same environment as the API.

## Install

```bash
python3 -m pip install openpyxl
```

CSV uses the Python standard library. No extra package.

## Read a sheet

- Use the first row as headers.
- Headers must cover the columns named in `shared/player-schema.md`.
- Read `.xlsx` with `openpyxl`. Read `.csv` with the `csv` module.
- Keep the phone as text so leading zeros stay intact.

## Check

```bash
python3 -c "import openpyxl; print('ok')"
```

The command prints `ok`.
