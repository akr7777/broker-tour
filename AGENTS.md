# AGENTS.md

Vite + React 18 + TypeScript SPA for a Costa Rica tour-booking site. The README is stock Vite boilerplate; trust package.json and the code instead.

## Commands

- Install: `pnpm install` (pnpm is the package manager; `pnpm-lock.yaml` is the lockfile)
- Dev server: `pnpm dev`
- Typecheck only: `pnpm exec tsc --noEmit`
- Build: `pnpm build` (`tsc && vite build`)
- Lint: `pnpm lint` (ESLint with `--max-warnings 0`)
- Preview built output: `pnpm preview`
- There is currently no test runner or `test` script. Do not assume `pnpm test` exists.

## Testing

- When adding functionality, add tests for it. Introduce a test runner and a `test` script with the first tests.
- When changing existing behavior, run the test suite if one exists.
- Never report tests as run or passed unless a test runner actually executed.
- Before finishing any change, run `pnpm exec tsc --noEmit`, the test suite (if present), `pnpm lint`, and `pnpm build`.

## Environment

- Create a local `.env` (gitignored; there is no `.env.example`) with:
  - `VITE_SERVER_URL` — backend base URL used by `src/api/api.ts` and the contact/booking forms.
  - `VITE_WEB_SITE_URL` — public site URL sent as `origin` by `src/widgets/contact-form-feedback/contact-form-feedback.tsx`.
- The app builds and renders without `.env`, but the contact/booking forms will post to `undefined`.
- Backend usage is inconsistent: `src/api/api.ts` uses `VITE_SERVER_URL` as an axios base URL and posts to `contact_form`, while `src/components/contact-form/contact-form.tsx` POSTs directly to `VITE_SERVER_URL` and checks for `data.status === 277`. Check which form you are changing.

## Architecture

- Entry flow: `index.html` -> `src/main.tsx` -> `src/App.tsx` (Redux Provider, react-router `createBrowserRouter`).
- Routes live in `src/App.tsx`; paths are centralized in `src/widgets/nav-menu/nav-paths.ts`. Tour pages are `/tour-info/:tourId` with numeric IDs 1-4 from `TOURS_IDS` in `src/store/consts.ts`.
- `src/pages/outlet-page/outlet-page.tsx` is the shared layout (header, welcome section, contacts, footer). Route pages render only the middle content.
- Layering: `src/pages` (route screens) -> `src/widgets` (page sections) -> `src/components` (reusable UI) -> `src/shared` (wrappers/animations). Imports are relative; there are no TypeScript path aliases.
- Tour data is not fetched: copy/prices live in `src/store/tour-info.ts`, and photos are static imports in `src/store/tour-days-photos.tsx`. Tour text and FAQ text come from i18n JSON.
- Adding a tour, day, FAQ, or photo means editing those TS files plus all three language files; the image mappings are manual.
- `minPrice` (shown on cards) is hardcoded separately from the `adultPrice` table; changing one does not update the other.
- In-page sections are hash anchors whose IDs live in `DIV_IDS` (`src/store/consts.ts`). `PATHS.contacts` has no route; contacts are a section in the shared layout.

## i18n

- Loaded files: `src/i18/lang-en.json`, `lang-es.json`, `lang-ru.json` (see `src/i18/i18init.ts`). Spanish is the default and fallback; the selected language is stored in localStorage under the key `language`.
- The `___lang-*.json` files and `__lang-en copy 2024.07.14.json` are unused backups. Editing them has no effect.
- Dynamic key conventions: `faq.N.question` / `faq.N.answer` (capped by `FAQ_QUESTIONS_COUNT = 20`), `tours.tourN.plan.dayM` (lines are split on `\n`), `tours.tourN.days-count`.
- All three language files are expected to carry the same keys, but they currently diverge; when touching copy, keep en/es/ru in sync.

## Styling

- SCSS (Dart Sass). Shared variables (colors, sizes) are in `src/assets/styles/common-variables.scss`; JS breakpoints are in `src/hooks/use-resize/const-breakpoints.ts`.
- Components import their own `.scss`, and file names do not always match component names. Styling uses plain kebab-case class strings, not CSS modules.
- Global font and base styles are in `src/index.scss`.

## Gotchas

- Legacy/unused code: `src/pages/choose-tour`, `src/components/vertical-stepper`, `src/components/___carusel`, and `src/widgets/our-tours-widget`. Active tour UI uses `our-tour-widget-2` and `price-calculation-2`.
- `toursContent()` translates at call time and is called from several components; module-level expressions evaluated at import time will not refresh on language change.
- `index.html` contains the initial preloader plus GA, Yandex Metrika, and Meta Pixel snippets and SEO meta. Do not remove them as cleanup.
- TypeScript is strict and fails on unused locals/parameters. ESLint uses `.eslintrc.cjs` and ignores `dist`.
- No CI, formatter config, or pre-commit hooks exist; match the surrounding style manually.
