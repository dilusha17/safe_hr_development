# Safe HR Consultants – Laravel 12 + Inertia + React

Laravel 12 back end with the Safe HR store front end (React 18, TypeScript, Tailwind CSS v4, shadcn/ui) delivered through Inertia v2. No Laravel starter kit.

## Setup

```bash
composer update inertiajs/inertia-laravel   # first time only: adds inertia-laravel to composer.lock
cp .env.example .env && php artisan key:generate
# set APP_URL in .env to the public site URL (used for canonical links, og:url and JSON-LD)
npm install
npm run build        # or: composer run dev
```

## Where things are

| Path | What |
| --- | --- |
| `routes/web.php`, `app/Http/Controllers/StorefrontController.php` | One route per page; each renders an Inertia page |
| `app/Http/Middleware/HandleInertiaRequests.php`, `bootstrap/app.php` | Inertia middleware, 403/404/500/503 rendered by `pages/Error.tsx` |
| `resources/views/app.blade.php` | Root template (fonts, favicon, default meta) |
| `resources/js/app.tsx` | Inertia entry; wraps every page in `layouts/StoreLayout.tsx` |
| `resources/js/pages/**` | One file per page (`Shop/Category.tsx` ↔ `Inertia::render('Shop/Category')`) |
| `resources/js/lib/nav.tsx` | `AppLink`, `useAppNavigate`, `useUrlSearch` (Inertia replacements for the old router helpers) |
| `resources/js/components/Seo.tsx` | Per-page title, meta, canonical and JSON-LD |
| `resources/css/app.css` | Tailwind v4 theme tokens (no `tailwind.config`) |

## Adding a page

1. Create `resources/js/pages/Something.tsx` (default export, include `<Seo … />`).
2. Add a method to `StorefrontController` returning `Inertia::render('Something')` and a route in `routes/web.php`.

## Commands

- `npm run dev` / `npm run build` – Vite
- `npm run typecheck` – TypeScript
- `npm run test:js` – Vitest (cart, blog and icon tests)
- `php artisan test` – Pest (every route renders its Inertia page)

## Notes

- Products, categories and blog articles still live in `resources/js/data` and are rendered client-side. Move them to the database and pass them as props from the controller when the back end is built; unknown slugs currently show the 404 view with HTTP 200.
- Pages render on the client (no Inertia SSR yet), so social-media crawlers that do not run JavaScript will not see per-page meta tags. Add Inertia SSR before relying on link previews.
