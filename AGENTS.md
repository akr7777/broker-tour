# AGENTS.md

Vike + React 18 + TypeScript SSG site for a Costa Rica tour-booking business. `README.md` is the project overview; trust `package.json`, `pages/`, and the code for implementation details.

## Commands

- Install: `pnpm install` (pnpm is the package manager; `pnpm-lock.yaml` is the lockfile)
- Dev server: `pnpm dev` (`vike dev`)
- Typecheck only: `pnpm exec tsc --noEmit`
- Build: `pnpm build` (`tsc --noEmit && vike build`)
- Lint: `pnpm lint` (ESLint with `--max-warnings 0`)
- Preview built output: `pnpm preview` (`vike preview`)
- Tests: `pnpm test` (Vitest, jsdom); watch: `pnpm test:watch`

## Testing

- Vitest + jsdom is configured in `vitest.config.ts`.
- Tests live next to the code as `*.test.ts(x)`.
- When adding functionality, add tests for it.
- When changing existing behavior, run the test suite.
- Never report tests as run or passed unless a test runner actually executed.
- Before finishing any change, run `pnpm exec tsc --noEmit`, `pnpm test`, `pnpm lint`, and `pnpm build`.

## Architecture

- Entry flow: Vike pages in `pages/` + `vike-react`; there is no `index.html`, `src/main.tsx`, or `src/App.tsx`.
- `pages/+config.ts` extends `vike-react`; `trailingSlash: true`.
- Prerendering is enabled in `vite.config.ts` via `vike({ prerender: { parallel: false }, trailingSlash: true })`. A boolean `prerender: true` in `pages/+config.ts` is ignored by this Vike version.
- `pages/+Layout.tsx` renders the shared chrome: Redux Provider, preloader, toast container, header/hero, butterfly animation, page content, contacts, footer.
- `pages/+Head.tsx` builds title/description/canonical/hreflang/OG/JSON-LD and analytics scripts.
- `pages/+lang.ts` sets `<html lang>` from `pageContext.routeParams.lang`.
- Routes: `/`, `/about/`, `/faq/`, `/tour-info/1..4/`, plus `/es/...` and `/en/...`. Each route has `+route.ts`; dynamic routes also have per-page `+onBeforePrerenderStart.ts`.
- `pnpm build` produces 21 prerendered HTML pages in `dist/client/`.
- Layering: `src/pages` (route screens) -> `src/widgets` (page sections) -> `src/components` (reusable UI) -> `src/shared` (wrappers/animations).
- Tour data is static: copy/prices in `src/store/tour-info.ts`; photos in `src/store/tour-days-photos.tsx`; tour and FAQ text in i18n JSON. `toursContent(i18n)` and `faq_Data(i18n)` require the page i18n instance.
- `minPrice` on cards is hardcoded separately from the `adultPrice` table; changing one does not update the other.
- In-page sections are hash anchors whose IDs live in `DIV_IDS` (`src/store/consts.ts`).
- `src/vike/router.tsx` and `src/vike/nav-link.tsx` provide the small navigation compatibility layer used by components.
- `src/vike/router.tsx` exposes `useNavigate`, `useParams`, `useLocation`; `NavLink` lives in `src/vike/nav-link.tsx`.
- `src/seo/schema.ts` contains the JSON-LD graph; `src/seo/analytics.tsx` contains GA, Yandex Metrika, and Meta Pixel snippets; `src/api/emailjs.ts` sends booking notifications.

## i18n

- Loaded files: `src/i18/lang-en.json`, `lang-es.json`, `lang-ru.json` (see `src/i18/i18-config.ts`). Russian is the default and fallback; the selected language is stored in localStorage under the key `language`.
- Language is URL-based: `/` = ru, `/es/` = es, `/en/` = en. `pages/+lang.ts` sets `<html lang>`.
- `LanguageChanger` persists an explicit choice and navigates to the localized URL. On the root page, a stored `es`/`en` choice can redirect client-side.
- Each page gets its own i18n instance from `createI18n(language)`; `pages/+Layout.tsx` provides it via `I18nextProvider`. `pages/+Head.tsx` creates its own instance for metadata. Prerendering still uses `parallel: false` for the shared Redux store.
- The `___lang-*.json` files and `__lang-en copy 2024.07.14.json` are unused backups. Editing them has no effect.
- Dynamic key conventions: `faq.N.question` / `faq.N.answer` (capped by `FAQ_QUESTIONS_COUNT = 20`), `tours.tourN.plan.dayM` (lines are split on `\n`), `tours.tourN.days-count`.
- All three language files are expected to carry the same keys; keep en/es/ru in sync.

## Environment

- `.env.example` exists; copy it to `.env` (gitignored) and fill:
  - `VITE_EMAILJS_SERVICE_ID` — EmailJS service ID;
  - `VITE_EMAILJS_TEMPLATE_ID` — booking template ID;
  - `VITE_EMAILJS_PUBLIC_KEY` — public EmailJS key.
- `VITE_*` values are embedded at build time. The public key is not a secret.
- EmailJS allowed origins are configured in the EmailJS dashboard.
- The booking form sends through `src/api/emailjs.ts`; `VITE_SERVER_URL` and `VITE_WEB_SITE_URL` are no longer used.
- Without `.env`, the app builds and renders, but the form shows a configuration error instead of sending.

## Styling

- SCSS (Dart Sass). Shared variables (colors, sizes) are in `src/assets/styles/common-variables.scss`; JS breakpoints are in `src/hooks/use-resize/const-breakpoints.ts`.
- Components import their own `.scss`, and file names do not always match component names. Styling uses plain kebab-case class strings, not CSS modules.
- Global font and base styles are in `src/index.scss`; preloader styles are in `index.css`.

## Static assets and SEO

- `public/` contains `robots.txt`, `sitemap.xml`, `llms.txt`, `404.html`, `logo.png`, `og/cover.jpg`, `favicon.svg`, and `index-preloader-script.js`.
- `dist/client/` is the deployable artifact. It contains HTML directories, `*.pageContext.json` (needed for Vike client navigation), hashed assets, and public files.
- Do not deploy `dist/server/` for the fully prerendered site.
- `DEPLOYMENT.md` documents nginx and third-party static hosting.

## Gotchas

- Vike is pinned to `0.4.220` for Vite 5.2/React 18 compatibility. Do not upgrade Vike alone: newer `vike-react` requires React 19, and newer Vike requires Vite 7.
- The active Vike setup requires per-page `+onBeforePrerenderStart` hooks. A global hook returning URLs for multiple pages causes duplicate-URL errors.
- `useResize` uses SSR defaults (`1200×800`) and updates after mount; this avoids SSR crashes but may cause a brief mobile layout shift.
- `src/widgets/faq/faq.tsx` uses native `<details>` so answers are present in HTML.
- EmailJS works without CAPTCHA: rely on allowed origins, honeypot, and EmailJS rate limits.
- `pnpm-workspace.yaml` contains `allowBuilds: esbuild: true`; pnpm 12 needs it for installs.
- Legacy SPA files and dependencies (`App.tsx`, `main.tsx`, React Router, Helmet, react-slick) have been removed.
- TypeScript is strict and fails on unused locals/parameters. ESLint uses `.eslintrc.cjs` and ignores `dist`.
- No CI, formatter config, or pre-commit hooks exist; match the surrounding style manually.
