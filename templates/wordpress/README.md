# WordPress Template Brief

Use for WordPress plugins, WooCommerce extensions and content-heavy sites.

## Expected folders

- `includes/`
- `admin/`
- `public/`
- `assets/`
- `tests/`

## Rules

- Use nonces and capability checks on every admin action.
- Add activation, upgrade and uninstall routines.
- Avoid remote calls during plugin activation.
