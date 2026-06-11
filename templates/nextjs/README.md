# Next.js Template Brief

Use for React-heavy products, static marketing, serverless dashboards and edge-friendly apps.

## Expected folders

- `app/`
- `components/`
- `lib/server`
- `lib/client`
- `tests/`

## Rules

- Never expose secrets through `NEXT_PUBLIC_*`.
- Move long jobs to queues or external workers.
- Prefer static generation for docs and marketing pages.
