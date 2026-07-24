# Portfolio Site Template

Astro + microCMS portfolio template for illustrators and photographers.

## Setup

1. Use this template on GitHub.
2. Install dependencies.

```sh
npm install
```

3. Copy `.env.example` to `.env`.

```sh
cp .env.example .env
```

4. Create a `works` API in microCMS.
5. Set environment variables in `.env`.

```env
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key
```

6. Start the local development server.

```sh
npm run dev
```

7. Connect the repository to Cloudflare Workers.

## Data

If microCMS environment variables are not set, the site uses sample works from `src/data/sampleWorks.ts`.
After `.env` is configured, works are loaded from microCMS at build time and Astro generates static HTML.

The current microCMS endpoint is configured in `src/lib/microcms.ts`.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Do Not Commit

These files and directories are ignored:

- `node_modules/`
- `dist/`
- `.env`
- `.wrangler/`
- `.astro/`
