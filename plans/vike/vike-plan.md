# План: миграция на Vike (SSG) для SEO/GEO

> Связанные документы:
>
> - язык и URL: `plans/language/lang-plan.md`;
> - Schema.org, H1, FAQ, sitemap: `plans/geo/geo-plan.md`;
> - деплой и nginx: `DEPLOYMENT.md`.

## 1. Цель

Перевести текущее Vite + React SPA на Vike с полным пререндером (SSG), чтобы поисковые роботы и AI-краулеры получали готовый HTML, а не пустую оболочку SPA.

Итоговое приложение:

- Vike + React 18 + TypeScript + Vite;
- все страницы пререндерятся на этапе сборки в `dist/client/`;
- русские страницы на `/`, испанские на `/es/`, английские на `/en/`;
- сервер не нужен: production — статические файлы + nginx;
- контент, H1/H2, FAQ, ссылки и JSON-LD присутствуют в HTML без выполнения JS;
- гидрация не даёт ошибок и не ломает мобильную/десктопную верстку.

## 2. Текущее состояние

- SPA: `index.html` → `src/main.tsx` → `src/App.tsx`; контент рисуется в браузере.
- Роутинг: `createBrowserRouter` в `src/App.tsx`.
- Язык: глобальный i18next, принудительно `es` (`src/i18/i18init.ts:21-22`).
- `localStorage` читается прямо в рендере (`src/App.tsx:64`, `src/components/languageChanger/languageChanger.tsx:25`).
- `<title>` и `meta description` закомментированы в `index.html:14,22`; meta задаётся через `react-helmet` в `src/App.tsx:16,76`.
- Нет H1; заголовки — `h2`/`h4`.
- Нет тест-раннера и CI.
- Baseline: `pnpm exec tsc --noEmit` и `pnpm lint` сейчас падают на неиспользуемой `t` в `src/widgets/wellcome-widget/wellcome-widget.tsx`; исправить в этапе 1.
- Legacy: `src/pages/choose-tour`, `src/components/vertical-stepper`, `src/components/___carusel`, `src/widgets/our-tours-widget` не используются.

## 3. Принятые решения

| Вопрос | Решение |
|---|---|
| Рендеринг | Vike SSG, все страницы пререндерятся |
| Роутинг | нативный routing Vike, React Router удаляется |
| Языки | `/` = ru, `/es/`, `/en/` |
| i18n | отдельный инстанс на страницу |
| `localStorage` | только явный выбор пользователя |
| Авторедирект | только с `/`, только по `localStorage`, без `navigator` |
| Head | Vike `+Head`, `react-helmet` удаляется |
| Legacy | удаляем перед миграцией |
| Тесты | Vitest + jsdom + SSR smoke |
| Деплой | `dist/client/` + nginx, без Node-сервера |
| Домен | `https://costaricatures.com/`, без `www` |

## 4. Версии и базовая настройка

Текущий стек: **Vite 5.2.11 + React 18.2 + TypeScript 5.2**.

Важно: самые новые версии Vike уже несовместимы с этим стеком:

- `vike@0.4.268` требует `vite >= 7.1.0`;
- `vike-react@0.6.x` требует `react >= 19`;
- `vike@0.4.240+` требует `vite >= 6.3.0`;
- `vike@0.4.235` формально ставится с Vite 5.2, но падает на сборке (`vite does not provide an export named createBuilder`).

Поэтому для миграции **без перехода на React 19** фиксируем совместимую пару:

```bash
pnpm add vike@0.4.220 vike-react@0.5.10 react-streaming@0.3.42
```

- `vike@0.4.220` — проверенная на PoC версия с Vite 5.2;
- `vike-react@0.5.10` — peer `react >= 18.0.0`;
- `react-streaming@0.3.42` — peer `react >= 18`;
- `vite@5.2.11` и `react@18.2.x` остаются.

> PoC на этой связке собрал все 18 HTML: `/`, `/faq/`, `/tour-info/1..4/` на `ru`/`es`/`en`, с корректным `<html lang>` и per-page `+onBeforePrerenderStart`.

> Переход на Vike 0.4.268 + vike-react 0.6 + React 19 + Vite 7 — отдельная большая миграция. Её не смешиваем с SEO/GEO-задачей.

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default defineConfig({
  plugins: [react(), vike({ prerender: true })],
})
```

> Проверено на PoC с `vike@0.4.220`: boolean `prerender: true` в `pages/+config` игнорируется. Включаем пререндер через `vike({ prerender: true })` в `vite.config.ts`.

`pages/+config.ts` (только расширение; `prerender` включается в `vite.config.ts`):

```ts
import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact],
} satisfies Config
```

Скрипты `package.json`:

```json
{
  "scripts": {
    "dev": "vike dev",
    "build": "tsc --noEmit && vike build",
    "preview": "vike preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`tsconfig.json`: добавить `pages` в `include` (сейчас там только `src`), иначе `pages/*.tsx` не проверяются. `tsconfig.node.json` должен включать `vite.config.ts` и `vitest.config.ts`.

`vike-react` даёт настройки:

- `+Head` — meta, canonical, hreflang, JSON-LD;
- `+lang.ts` — `<html lang>`; можно вернуть `pageContext.routeParams.lang`;
- `+Layout`/`+Wrapper` — layout и провайдеры;
- `<ClientOnly>` — для браузерных компонентов.

## 5. Целевая структура

Примерная структура (уточняется на PoC):

```text
pages/
  +config.ts
  +Layout.tsx
  +Head.tsx
  +lang.ts
  index/+Page.tsx
  index/+route.ts
  index/+onBeforePrerenderStart.ts
  faq/+Page.tsx
  faq/+route.ts
  faq/+onBeforePrerenderStart.ts
  tour-info/@tourId/+Page.tsx
  tour-info/@tourId/+route.ts
  tour-info/@tourId/+onBeforePrerenderStart.ts
src/
  app/            # layout, header, footer, providers
  i18/            # ресурсы, фабрика i18n, языковые пути
  seo/            # JSON-LD, метаданные, sitemap-хелперы
  store/          # данные туров и UI-состояние
  assets/         # изображения, стили
public/
  logo.png
  og/cover.jpg
  robots.txt
  sitemap.xml
  llms.txt
  404.html
  index-preloader-script.js
```

Роуты:

```text
/                         RU главная
/faq/                     RU FAQ
/tour-info/:tourId/       RU тур 1–4
/es/...                   ES
/en/...                   EN
```

Языковой префикс разбирается до маршрутизации через `+route` (route function). Псевдокод:

```ts
// pages/index/+route.ts
export function route(pageContext) {
  const match = pageContext.urlPathname.match(/^\/(?:(es|en)\/)?$/)
  if (!match) return false
  return { routeParams: { lang: match[1] ?? 'ru' } }
}

// pages/faq/+route.ts
export function route(pageContext) {
  const match = pageContext.urlPathname.match(/^\/(?:(es|en)\/)?faq\/?$/)
  if (!match) return false
  return { routeParams: { lang: match[1] ?? 'ru' } }
}

// pages/tour-info/@tourId/+route.ts
export function route(pageContext) {
  const match = pageContext.urlPathname.match(/^\/(?:(es|en)\/)?tour-info\/(\d+)\/?$/)
  if (!match) return false
  return { routeParams: { lang: match[1] ?? 'ru', tourId: match[2] } }
}
```

Неизвестный префикс (`/de/`) не должен совпадать ни с одним route и приводит к 404. `lang` из `routeParams` передаётся в page-level i18n и в `+lang.ts` (`<html lang>`).

`+onBeforePrerenderStart` задаётся **на каждой странице отдельно** и возвращает только URL этой страницы. Нельзя возвращать URL других страниц: Vike вызовет хук для каждой страницы и получит дубликаты.

```ts
// pages/index/+onBeforePrerenderStart.ts
export function onBeforePrerenderStart() {
  return ['/', '/es/', '/en/']
}

// pages/faq/+onBeforePrerenderStart.ts
export function onBeforePrerenderStart() {
  return ['/faq/', '/es/faq/', '/en/faq/']
}

// pages/tour-info/@tourId/+onBeforePrerenderStart.ts
export function onBeforePrerenderStart() {
  const tourIds = [1, 2, 3, 4]
  return tourIds.flatMap((id) => [
    `/tour-info/${id}/`,
    `/es/tour-info/${id}/`,
    `/en/tour-info/${id}/`,
  ])
}
```

> Проверено на PoC с `vike@0.4.220`: глобальный хук, возвращающий URL нескольких страниц, падает с `URL / provided twice`. Поэтому хуки — per-page.
>
> Точный синтаксис `+route`/`+onBeforePrerenderStart` проверить на PoC по `vike.dev/i18n` и `vike.dev/onBeforePrerenderStart`; приведённый код — план, не финальная реализация.

## 6. SSR/hydration: инвентарь блокеров

### 6.1 `window` в рендере

- `src/hooks/use-resize/useResize.ts:19-20` читает `window.innerWidth` в `useState`.
- Используется в `Header`, `Welcome`, `Butterfly`.
- Исправление: не менять структуру DOM по ширине; CSS media queries. Для декоративной анимации — `ClientOnly`.

### 6.2 `localStorage` в рендере

- `src/App.tsx:64`;
- `src/components/languageChanger/languageChanger.tsx:25`.
- Исправление: язык из URL/`pageContext`; `localStorage` только в `useEffect` или обработчике события.

### 6.3 `document` на уровне модуля

- `src/main.tsx:13` (`document.getElementById`).
- Исправление: Vike client entry; `main.tsx`/`App.tsx` как точка входа удаляются.

### 6.4 `react-helmet`

- `src/App.tsx:16,76`.
- Исправление: Vike `+Head`/`+title`/`+description`; статический JSON-LD в head.

### 6.5 Случайные ID в DOM

- `src/widgets/price-calculation-2/price-calculation-2.tsx:37,113` — `uuid()` используется как DOM `id`.
- `src/widgets/faq/faq.tsx:13`, навигация и списки — `uuid()` в ключах.
- Исправление: `useId()` для DOM; стабильные ключи (tour id, day number, index).

### 6.6 Навигация во время рендера

- `src/pages/tours/tour-info-page.tsx:23-24` вызывает `navigate()` при невалидном `tourId`.
- Исправление: `+guard`/`+onBeforeRender` → 404/redirect.

### 6.7 Побочные эффекты в рендере

- `src/pages/main-page/main-page.tsx:12-20` — `setTimeout` и `document.getElementById` при рендере.
- Исправление: `useEffect`/`onPageTransitionEnd`, данные из `pageContext.urlParsed.hash`.

### 6.8 Глобальный Redux

- `src/store/store.ts:5` — singleton.
- Исправление: store на страницу или `prerender: { parallel: false }` на первом этапе.

### 6.9 Глобальный i18next

- `src/store/tour-info.ts` и `src/store/consts.ts:70` вызывают глобальный `i18next`.
- `src/widgets/price-calculation-2/price-calculation-2.tsx:41` читает `i18next.language`.
- Исправление: i18n-инстанс на страницу, передача в `toursContent`/`faq_Data`.

### 6.10 Скрытый на сервере контент

- `src/shared/title/title.tsx` использует `useInView`; на сервере получает `opacity: 0`.
- `src/widgets/faq/faq.tsx` рендерит ответы только при раскрытии аккордеона.
- Исправление: серверный рендер видимый; FAQ через `<details>/<summary>`.

### 6.11 Навигация без ссылок

- `src/widgets/nav-menu/desctop-nav/desctop-nav.tsx`, `mobile-nav.tsx` — `nav`/`div` с `onClick`;
- `src/widgets/our-tour-widget-2/our-tour-2.tsx` — карточки `div` с `onClick`;
- `src/shared/logo/logo.tsx` — `motion.img` с `onClick`;
- `src/components/languageChanger/languageChanger.tsx` — `img` с `onClick`.
- Исправление: реальные `<a href>`; клиентская навигация через `navigate`/перехват.

### 6.12 Точка входа и аналитика

- `index.html` содержит прелоадер, GA, Yandex Metrika, Meta Pixel (не удалять).
- Исправление: перенести в Vike `+onRenderHtml`/`+Head`/layout; `index-preloader-script.js` оставить в `public/`.

### 6.13 Дублирование `ToastContainer`

- `src/App.tsx` и `src/main.tsx` дублируют `ToastContainer`.
- Исправление: один client-only `ToastContainer`.

## 7. Аудит библиотек

Проведён Node SSR smoke test (импорт + `renderToString`):

- `react-toastify` — OK;
- `react-international-phone` — OK;
- `framer-motion` — OK;
- `react-uuid` — OK (но случайные ID — проблема приложения);
- `axios` — OK;
- `i18next` — OK;
- `i18next-browser-languagedetector` — импорт OK; на сервере не использовать;
- `react-i18next` — OK;
- `react-redux` — OK;
- `@reduxjs/toolkit` — OK;
- `clsx` — OK;
- `react-helmet` — импорт/рендер OK, но обращается к `document` при обновлениях; удаляем;
- `react-slick` — импорт OK, но остаётся только в legacy; удаляем.

Вывод: библиотеки не являются основным блокером. Основные риски — наш код с `window`/`localStorage` и responsive-разметка.

## 8. Этапы

### Этап 0. PoC

- Использовать версии из раздела 4: `vike@0.4.220`, `vike-react@0.5.10`, `react-streaming@0.3.42`; не обновлять React/Vite на этом этапе.
- Добавить `vike()` в `vite.config.ts`, обновить `scripts`, добавить `pages` в `tsconfig.json`.
- Создать минимальные `pages/+config.ts`, `pages/+Layout.tsx`, `pages/+Head.tsx`, `pages/index/+Page.tsx`.
- Включить `prerender: true` через `vike({ prerender: true })` в `vite.config.ts`.
- Собрать через `vike build`, получить `dist/client/`, проверить `vike preview`.
- Проверить `curl`/`view-source`: в HTML есть текст, title, lang.
- Прогнать SSR-импорт текущих модулей; зафиксировать падения.
- **Выход**: PoC-страница отдаёт статический HTML; известен точный список правок.

### Этап 1. Чистка и фундамент

- Исправить baseline-ошибку: убрать неиспользуемую `t`/`useTranslation` в `src/widgets/wellcome-widget/wellcome-widget.tsx`.
- Удалить legacy: `src/pages/choose-tour`, `src/components/vertical-stepper`, `src/components/___carusel`, `src/widgets/our-tours-widget`.
- Удалить зависимости legacy/SPA: `react-router-dom`, `@types/react-router-dom`, `react-helmet`, `@types/react-helmet`, `react-slick`, `slick-carousel`, `@types/react-slick`.
- Удалить `i18next-browser-languagedetector`, если после перехода на URL-based язык он не используется.
- Проверить/убрать untracked `pnpm-workspace.yaml` с заглушкой `allowBuilds: esbuild: set this to true or false`.
- Перенести layout/header/footer/providers в Vike.
- Удалить `react-helmet`; подключить `+Head`.
- Перенести прелоадер и аналитику.
- Исправить `window`/`localStorage`/`document` в рендере.
- Добавить `useId`/стабильные ключи.
- `ToastContainer` — client-only.
- `ArticleTitle` — видимый на сервере.
- Добавить `vitest@^2` + `jsdom`, `vitest.config.ts`, `test`/`test:watch` скрипты.
- **Выход**: приложение собирается через Vike, SSR-рендер не падает.

### Этап 2. Маршруты и компоненты

- Создать `pages/index`, `pages/faq`, `pages/tour-info/@tourId`.
- Заменить React Router:
  - `useNavigate` → Vike `navigate`;
  - `useParams` → `pageContext.routeParams`;
  - `useLocation`/hash → `pageContext` + effect;
  - `Outlet` → `+Layout`;
  - `NavLink` → `<a>` + active class.
- Реализовать guard/404 для невалидного тура и страницу `404.html` для nginx.
- Перенести hash-scroll в effect.
- Заменить клики на ссылки: nav, карточки туров, логотип, языковой переключатель.
- H1/H2 семантика и CSS.
- FAQ на `<details>/<summary>`.
- **Выход**: все маршруты работают, ссылки индексируемы, SSR-контент полный.

### Этап 3. Языки и URL

- Внедрить `/`, `/es/`, `/en/` по `plans/language/lang-plan.md`.
- Per-page i18n.
- `toursContent(i18n)`, `faq_Data(i18n)`.
- Переключатель языка сохраняет путь и hash.
- `localStorage` только для явного выбора.
- Авторедирект только с `/`.
- `hreflang`, canonical, `<html lang>`.
- Per-page `+onBeforePrerenderStart` хуки возвращают 18 URL суммарно (без дубликатов).
- **Выход**: все языковые версии пререндерятся, язык не смешивается.

### Этап 4. SEO/GEO

- JSON-LD: `TravelAgency`, `Person`, `WebSite`, `FAQPage`.
- H1/H2 с ключевыми фразами.
- FAQ-ответы в HTML.
- `sitemap.xml`, `robots.txt`, `llms.txt`.
- OG/Twitter meta.
- Реальные `alt` у ключевых изображений.
- **Выход**: HTML проходит Schema Validator; H1, FAQ и ссылки видны без JS.

### Этап 5. Hardening и деплой

- Проверить гидрацию на мобильном/десктопе, консоль без предупреждений.
- Проверить библиотеки после интеграции.
- Настроить nginx по `DEPLOYMENT.md`.
- Проверить 301 для `www`, `http`, второго домена.
- Проверить trailing slash.
- Прогнать полный набор команд.
- Обновить `AGENTS.md`.
- **Выход**: production-ready статика на сервере.

## 9. Тесты

Добавить Vitest + jsdom.

Обязательные тесты:

- SSR-рендер каждой страницы без `window`/`localStorage` ошибок;
- 18 пререндеренных URL существуют в `dist/client`;
- `<html lang>` соответствует языку;
- title/description/canonical/hreflang;
- H1 ровно один на страницу;
- FAQ-ответы присутствуют в HTML;
- JSON-LD парсится и содержит нужные поля;
- ссылки навигации/туров/языков — `<a href>`;
- язык не смешивается между страницами;
- авторедирект только с `/`;
- стабильные DOM id (нет случайных UUID);
- `sitemap.xml` содержит все URL;
- `robots.txt` указывает на правильный sitemap.

Команды:

```bash
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm build
pnpm exec vike preview
```

## 10. Проверка HTML как робот

```bash
curl -sS https://costaricatures.com/ | grep -q "<h1"
curl -sS https://costaricatures.com/ | grep -q "Русскоговорящий гид"
curl -sS https://costaricatures.com/es/ | grep -q 'lang="es"'
curl -sS https://costaricatures.com/en/tour-info/1/ | grep -q 'lang="en"'
curl -sS -A "GPTBot" https://costaricatures.com/ | grep -q "<h1"
curl -sS -A "PerplexityBot" https://costaricatures.com/ | grep -q "<h1"
```

Дополнительно:

- `view-source:` без JS;
- Schema Markup Validator;
- Google Rich Results Test;
- Lighthouse SEO.

## 11. Риски и откат

- **Vike/Vite/Node несовместимы.** Использовать проверенную связку `vike@0.4.220` + `vite@5.2.11`; `vike@0.4.235` падает на сборке с Vite 5.2. Не обновлять React/Vite без отдельной задачи.
- **Глобальный i18n.** Не оставлять singleton в рендере.
- **Hydration mismatch.** Не менять DOM по ширине; CSS-first.
- **Случайные ID.** Заменить до проверки гидрации.
- **Скрытый контент.** Не использовать `opacity: 0`/`display:none` для основного текста.
- **Trailing slash и деплой.** Проверить nginx на всех URL.
- **Испанское SEO.** `/` становится русским; испанский уезжает на `/es/`. Решение принято.
- Откат: вернуть SPA-версию из git; данные не мигрируются; домены и nginx можно вернуть отдельно.

## 12. Критерии готовности

- Vike собирает статику в `dist/client/`.
- 18 страниц (3 языка × 6 маршрутов) пререндерены.
- В HTML без JS есть H1, текст, FAQ-ответы, ссылки, JSON-LD.
- Нет ошибок гидрации.
- Язык определяется URL; `localStorage` — только явный выбор.
- Авторедирект только с `/`.
- `pnpm exec tsc --noEmit`, `pnpm test`, `pnpm lint`, `pnpm build` проходят.
- `DEPLOYMENT.md` проверен на сервере.
- `AGENTS.md` обновлён.

## 13. Вне рамок

- Внешние статьи, форумы, Reddit, VC.ru, Дзен — задача заказчика.
- Гарантия рекомендаций в ChatGPT/Gemini/Perplexity.
- Новые языки и перевод URL-слагов.
- Полноценный SSR на Node в production; используется SSG.
- Оплата, бронирование, backend-изменения.
