# Garment Store

A simple seasonal clothing store built with Next.js (App Router), React,
Tailwind CSS v4 and shadcn/ui (Base UI). Products live in a typed data file, so
there is no database or backend to set up.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command          | What it does                      |
| ---------------- | --------------------------------- |
| `npm run dev`    | Start the dev server              |
| `npm run build`  | Production build                  |
| `npm run start`  | Run the production build          |
| `npm run lint`   | Lint and format check (Biome)     |
| `npm run format` | Format all files (Biome)          |

> This project uses a recent Next.js with Cache Components turned on. Anything
> that reads the request (`searchParams`, `cookies()`) has to sit inside
> `<Suspense>`. See `AGENTS.md` and `node_modules/next/dist/docs/`.

## Pages

| Route              | What it shows                                             |
| ------------------ | --------------------------------------------------------- |
| `/`                | Banner carousel, latest arrivals by season, shop CTA      |
| `/products`        | Product grid with filters (the filters live in the URL)   |
| `/products/[slug]` | Product details, size picker, add to cart                 |

The cart (navbar) is stored in the browser's localStorage. Search opens from the
navbar and sends you to `/products?q=...`.

## Editing the products

Everything about the catalogue is in `src/data`:

- `data.ts`: the products. Each has one image, one price, an optional
  percentage `discount`, and a stock count per size.
- `categories.ts`: the seasons used as categories. A category with no products
  is hidden from the filters automatically.
- `sizes.ts`: the allowed sizes (`S`, `M`, `L`, `XL`).
- `constants.ts`: currency, sort options and the price slider range.

Product photos go in `public/assets/products` and are referenced from `data.ts`
as `/assets/products/<file>`.

## Project structure

```
src/
  app/(routes)/        Pages, navbar and footer
  components/ui/       shadcn/ui components (add more with `npx shadcn add`)
  components/global-ui Shared components (product card, empty state, ...)
  data/                Products, categories, sizes, nav links, constants
  features/            Product listing: filters, sorting, grid
  hooks/               Cart store (zustand), wishlist, URL param helpers
  schema/              Zod schema that validates the filter URL params
  utils/               Pricing, filtering, sorting helpers
```

## Not built yet

- `/checkout`: the cart's Checkout button links here, but the page doesn't exist.
- Wishlist: `hooks/useWishlist.ts` works but isn't used by any component yet.
- About and Contact pages (add them to `src/data/links.ts` once they exist).
