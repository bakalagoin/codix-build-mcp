# Laravel Livewire Template Brief

Use for SaaS, marketplaces, dashboards, APIs with an admin, and shared-hosting projects.

## Stack

- Laravel 13
- Blade + Livewire
- Alpine from Livewire
- Tailwind CSS via Vite
- MySQL/MariaDB
- queue/database, cache/file or database, session/database

## Expected folders

- `app/Models`
- `app/Services`
- `app/Livewire`
- `app/Http/Controllers`
- `app/Http/Requests`
- `resources/views`
- `routes/web.php`, `routes/api.php`
- `tests/Feature`, `tests/Unit`

## Rules

- Do not assume a permanent Node server on cPanel.
- Keep secrets in `.env` or encrypted DB config, never in public JS.
- Add policies/Form Requests for protected resources.
