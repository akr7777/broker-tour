# Costa Rica Tures

Сайт туроператора Costa Rica Tures: Vike + React 18 + TypeScript, полный пререндер (SSG).

- Основной домен: `https://costaricatures.com/`
- Языки: `/` — русский, `/es/` — испанский, `/en/` — английский
- 21 пререндеренная страница: главная, `/about/`, `/faq/`, `/tour-info/1..4/` на трёх языках
- Production — статические файлы из `dist/client/`, без Node.js-сервера

## Быстрый старт

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Dev-сервер: `http://localhost:3000/`.

Проверки перед изменениями:

```bash
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm build
```

Предпросмотр production-сборки:

```bash
pnpm preview
```

## Переменные окружения

Файл `.env.example`:

```dotenv
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=public_xxxxxxxxxxxx
```

- Значения встраиваются в бандл на этапе сборки.
- `VITE_EMAILJS_PUBLIC_KEY` — публичный ключ, не секрет.
- Разрешённые origins настраиваются в кабинете EmailJS.
- Без `.env` сайт собирается, но форма бронирования показывает ошибку конфигурации.
- `VITE_SERVER_URL` и `VITE_WEB_SITE_URL` больше не используются.

## Структура

```text
pages/                  Vike-страницы, layout, head, lang, prerender
src/pages/              Экраны маршрутов
src/widgets/            Секции страниц
src/components/         Переиспользуемые компоненты
src/shared/             Обёртки и анимации
src/store/              Данные туров, контакты, Redux
src/i18/                Языки, JSON-переводы, создание i18n
src/seo/                JSON-LD, head-метаданные, аналитика
src/api/                EmailJS
src/vike/               Совместимость навигации с Vike
public/                 robots.txt, sitemap.xml, llms.txt, 404, изображения
```

Ключевые файлы:

- `pages/+Layout.tsx` — общий каркас: Redux, i18n, прелоадер, шапка, футер, контакты.
- `pages/+Head.tsx` — title, description, canonical, hreflang, OG, JSON-LD, аналитика.
- `pages/+lang.ts` — `<html lang>` из URL.
- `pages/+config.ts` — расширение `vike-react`, trailing slash.
- `vite.config.ts` — Vike и пререндер.
- `src/seo/schema.ts` — `TravelAgency`, `Person`, `WebSite`, `AboutPage`, `FAQPage`.
- `src/seo/head.ts` — сборка SEO-данных по языку и URL.
- `src/api/emailjs.ts` — отправка заявки.

## Контент

- Туры, цены и состав программ: `src/store/tour-info.ts`.
- Фото туров: `src/store/tour-days-photos.tsx`.
- Тексты, FAQ и About: `src/i18/lang-ru.json`, `lang-es.json`, `lang-en.json`.
- Контакты: `src/store/consts.ts` и `src/widgets/contacts/contacts-2.tsx`.

Важно: `minPrice` на карточках задаётся отдельно от таблицы `adultPrice`. При изменении цен проверяйте оба места. Все три языковых файла должны содержать одинаковые ключи.

Фото команды пока заменены placeholders. Ожидаемые файлы:

- `public/team/olga.jpg`
- `public/team/david.jpg`

## Языки и URL

- `/` — ru
- `/es/`, `/en/` — языковые версии
- `/about/`, `/es/about/`, `/en/about/`
- `/faq/`, `/es/faq/`, `/en/faq/`
- `/tour-info/1..4/` и языковые варианты

Язык определяется URL. `LanguageChanger` сохраняет явный выбор в `localStorage` и ведёт на локализованный URL. На `/` сохранённый `es`/`en` может вызвать клиентский редирект.

## SEO/GEO

- Статический HTML на этапе `vike build`.
- H1/H2, FAQ-ответы в HTML через `<details>`.
- Canonical, hreflang, OG-мета.
- JSON-LD: компания, Ольга, Давид, сайт, AboutPage, FAQPage.
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/404.html`.
- Реальные `<a href>` для навигации, туров, логотипа и языков.

## Тесты

Vitest + jsdom. Тесты лежат рядом с кодом:

- `src/api/emailjs.test.ts`
- `src/components/contact-form/contact-form-utils.test.ts`
- `src/i18/i18-config.test.ts`
- `src/i18/langs.test.ts`
- `src/seo/head.test.ts`
- `src/seo/schema.test.ts`

Запуск: `pnpm test`, watch: `pnpm test:watch`.

## Деплой

Инструкции по nginx, доменам, 301-редиректам, статическому хостингу и rollback: `DEPLOYMENT.md`.

Кратко:

- Собрать: `pnpm build`.
- Загрузить всё содержимое `dist/client/` в корень сайта.
- Не загружать `dist/server/`.
- Не включать SPA-fallback на `/index.html`.
- Обязательно сохранять `*.pageContext.json` — они нужны для клиентской навигации Vike.

## Документация и планы

- `AGENTS.md` — актуальные команды, архитектура, i18n, env и gotchas.
- `DEPLOYMENT.md` — nginx и сторонний статический хостинг.
- `plans/vike/vike-plan.md` — решения по Vike/SSG.
- `plans/language/lang-plan.md` — URL-based i18n.
- `plans/geo/geo-plan.md` — SEO/GEO, Schema.org, H1, FAQ, sitemap.
- `plans/emailjs/emailjs-plan.md` — EmailJS.

## Известные ограничения

- Фото Ольги и Давида ещё не добавлены.
- Формулировки DMC/NeedGuide-профилей стоит финально подтвердить у заказчика.
- Браузерная гидрация и мобильная вёрстка вручную не проверялись.
- EmailJS требует реальных ключей и настройки шаблона в кабинете.
- `TouristTrip`/`Product` с ценами для туров пока не добавлены.
