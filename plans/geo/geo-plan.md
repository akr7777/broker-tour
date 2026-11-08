# План: SEO/GEO — видимость для поисковых систем и нейросетей

> Связанные документы:
>
> - миграция на Vike/SSG: `plans/vike/vike-plan.md`;
> - языковые URL: `plans/language/lang-plan.md`;
> - деплой: `DEPLOYMENT.md`.

## 1. Цель

Сделать так, чтобы поисковые роботы и AI-краулеры (GPTBot, PerplexityBot, Googlebot, Bingbot) получали полноценный русский HTML и могли однозначно связать сайт, компанию и гида:

- `Costa Rica Tures`;
- `SRL Oldaga Group`;
- `Ольга Наймушина` / `Olga Naimushina`;
- `https://costaricatures.com/`;
- профили на внешних площадках.

Это техническая база. Она не гарантирует первые места в рекомендациях ChatGPT/Gemini/Perplexity, но убирает главные препятствия: SPA-оболочку без контента, отсутствие H1 и структурированных данных.

## 2. Текущие проблемы

- `index.html` не содержит основного контента; текст рисует React.
- `<title>` и `meta description` закомментированы (`index.html:14,22`).
- `react-helmet` добавляет meta только после JS.
- Нет H1; заголовки — `h2`/`h4`.
- FAQ-ответы на главной появляются только при раскрытии аккордеона.
- Навигация, карточки туров, логотип и переключатель языка — `div`/`img` с `onClick`, без `<a href>`.
- Нет Schema.org, canonical, `hreflang`, sitemap.
- `robots.txt:6` указывает sitemap на `https://www.example.com/sitemap.xml`.
- `ArticleTitle` на сервере получает `opacity: 0` из-за `useInView`.
- Бренд в разных местах называется по-разному: `Costa Rica Tures`, `Costa Rica Tours`, `Туры Коста-Рика`.

## 3. Принятые решения

| Вопрос | Решение |
|---|---|
| Основной домен | `https://costaricatures.com/`, без `www` |
| Второй домен | `turescostarica.com` → 301 на основной |
| Языки | `/` = ru, `/es/`, `/en/` |
| Роботы видят | HTML, отрендеренный на этапе сборки |
| H1 | один на страницу, видимый |
| FAQ | `<details>/<summary>`, ответы в DOM |
| Ссылки | реальные `<a href>` |
| Schema.org | `TravelAgency`, `Person` (Ольга и Давид), `WebSite`, `FAQPage`, `AboutPage` |
| `sameAs` | только реальные профили |
| Рейтинги | не добавлять без реальных отзывов |
| Sitemap | все 21 URL + языковые альтернативы |
| `llms.txt` | добавить как краткую карту сайта |

## 4. Что видят роботы после миграции

На `/` без выполнения JS:

- `<html lang="ru">`;
- `<title>` и `meta description` на русском;
- H1 «Русскоговорящий гид в Коста-Рике — Ольга Наймушина»;
- H2-секции, описания туров, FAQ-ответы;
- ссылки на туры, FAQ, контакты, языковые версии;
- JSON-LD с компанией, человеком, сайтом и FAQ;
- canonical и `hreflang`.

На `/es/` и `/en/` — то же на соответствующем языке.

## 5. H1/H2 и контент

### 5.1 Главная

- H1: `Русскоговорящий гид в Коста-Рике — Ольга Наймушина`.
- Подзаголовок/лид: `Индивидуальные туры и трансфер в Коста-Рике от Costa Rica Tures`.
- H2:
  - `Туры по Коста-Рике`;
  - `Расчёт стоимости тура`;
  - `О компании Costa Rica Tures и гиде Ольге Наймушиной`;
  - `Как забронировать тур`;
  - `Часто задаваемые вопросы о Коста-Рике`.

### 5.2 Страница тура

- H1: название тура.
- Лид: `Индивидуальный тур по Коста-Рике с русскоговорящим гидом Ольгой Наймушиной`.
- H2: `Программа тура`, `Стоимость`, `Отели`, `Как забронировать`.
- H3/H4: дни программы, отели.

### 5.3 FAQ

- H1: `Вопросы и ответы о Коста-Рике`.
- Вопросы — H2 или `<summary>`; ответы — видимый текст в DOM.
- На главной — тот же FAQ или его часть.

### 5.4 Страница `/about/`

Добавить отдельную страницу о компании и команде:

- `/about/`
- `/es/about/`
- `/en/about/`

Структура:

- **H1:** `Туроператор и принимающая сторона в Коста-Рике — Costa Rica Tures`.
- **Лид:** кто вы, для кого работаете, чем отличаетесь.
- **H2 `О компании`:** принимающая сторона/DMC, опыт, работа с туроператорами, агентствами и частными клиентами.
- **H2 `Команда`:**
  - карточка Ольги Наймушиной: основатель, организатор и координатор туров;
  - карточка Давида Гонсалеса: главный гид, гид-костариканец, свободно говорящий по-русски;
  - у каждой карточки — место под фото, имя, роль, короткий био и ссылка на NeedGuide.
- **H2 `Наши услуги`:** индивидуальные туры, экскурсии, авторские маршруты, VIP-транспорт и трансферы, подбор отелей, курирование тура, большие группы, новые маршруты.
- **H2 `Почему выбирают нас`:** опыт, русскоязычная команда, местный гид, логистика, отели, полный цикл.
- **H2 `Работа с туроператорами и агентствами`:** B2B/DMC-сценарий.
- **Ссылка на FAQ** вместо дублирования всего FAQ на странице.

Фото:

- `public/team/olga.jpg` — фото Ольги;
- `public/team/david.jpg` — фото Давида;
- до получения фото — нейтральный placeholder с инициалами, без выдуманных изображений;
- CSS: фиксированное соотношение сторон (например, `4/5`), `object-fit: cover`, адаптивность;
- `alt` — имя и роль, например `Ольга Наймушина, основатель Costa Rica Tures`;
- `Person.image` в Schema.org добавлять только после появления реальных фото.

Формулировки, требующие проверки:

- `10+ лет опыта` — уточнить, это опыт Ольги или компании; в текущем тексте компания с 2018 года;
- `туроператор`/`DMC` — подтвердить юридический статус;
- `единственный гид-костариканец` — заменить на проверяемое `гид-костариканец, свободно говорящий по-русски`.

### 5.5 About-секция на главной и футер

- На главной оставить короткий блок About как teaser.
- Добавить ссылку `Подробнее о компании` → `/about/`.
- В футере: `Costa Rica Tures — Туры и гид Ольга Наймушина`.
- В футере добавить ссылку `О компании` → `/about/`.
- Юридическое имя: `SRL Oldaga Group`.

### 5.6 Реализация заголовков

- `ArticleTitle` получает уровень (`as="h1" | "h2" | "h3"`).
- H1 не использовать для декоративных заголовков.
- CSS подогнать под текущий дизайн, не ломая адаптивность.
- Не скрывать H1/H2 через `display:none` или `opacity: 0`.

## 6. FAQ, видимый для AI

Рекомендуемое решение — `<details>/<summary>`:

```tsx
<details>
    <summary>{question}</summary>
    <div>{answer}</div>
</details>
```

Почему:

- ответ находится в HTML без клика;
- пользователь видит аккордеон без JS;
- доступно с клавиатуры;
- AI-краулеры и поисковики читают текст;
- не используется скрытый текст.

Не использовать:

- `display: none` для основного контента;
- рендер ответа только после `onClick`;
- `noscript` как единственный источник текста.

FAQ-разметка `FAQPage` должна генерироваться из тех же данных, что и видимый FAQ.

## 7. Ссылки и обход сайта

Заменить на `<a href>`:

- пункты навигации;
- карточки туров;
- логотип → `/`;
- переключатель языка → `/es/...`, `/en/...`;
- ссылки на FAQ и контакты;
- пункт меню `О нас` → `/about/`;
- ссылка `Подробнее о компании` из About-секции главной → `/about/`;
- ссылка `О компании` в футере → `/about/`;
- ссылки `Профиль на NeedGuide` в карточках Ольги и Давида.

Клиентскую навигацию можно сохранить через `navigate`/перехват, но у ссылки должен быть реальный `href`, чтобы робот мог её обойти.

Дополнительно:

- осмысленные `alt` у ключевых изображений;
- `aria-label` у иконочных ссылок;
- не дублировать одинаковые ссылки без необходимости.

## 8. Schema.org

### 8.1 Общая схема

Использовать `@graph` с устойчивыми `@id`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://costaricatures.com/#travelagency",
      "name": "Costa Rica Tures",
      "alternateName": [
        "Costa Rica Tours",
        "Туры Коста-Рика",
        "Costa Rica Tures — Туры и гид Ольга Наймушина"
      ],
      "url": "https://costaricatures.com/",
      "logo": "https://costaricatures.com/logo.png",
      "image": "https://costaricatures.com/og/cover.jpg",
      "description": "Индивидуальные туры, экскурсии и трансферы в Коста-Рике от русскоговорящего гида Ольги Наймушиной.",
      "telephone": "+50689122090",
      "email": "oldagatour@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "125 metros al este de la escuela Simon Bolivar",
        "addressLocality": "Grecia",
        "addressRegion": "Alajuela",
        "postalCode": "20304",
        "addressCountry": "CR"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Costa Rica"
      },
      "knowsLanguage": [
        { "@type": "Language", "name": "Russian", "alternateName": "ru" },
        { "@type": "Language", "name": "Spanish", "alternateName": "es" },
        { "@type": "Language", "name": "English", "alternateName": "en" }
      ],
      "founder": { "@id": "https://costaricatures.com/#olga" },
      "employee": [
        { "@id": "https://costaricatures.com/#olga" },
        { "@id": "https://costaricatures.com/#david" }
      ],
      "foundingDate": "2018",
      "knowsAbout": [
        "Туры по Коста-Рике",
        "Экскурсии и авторские маршруты",
        "VIP-транспорт и трансферы",
        "Подбор отелей",
        "Организация туров для туроператоров"
      ],
      "legalName": "SRL Oldaga Group",
      "sameAs": [
        "https://www.facebook.com/Brokertour.ru",
        "https://www.instagram.com/costarica_travelideas/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://costaricatures.com/#olga",
      "name": "Ольга Наймушина",
      "alternateName": "Olga Naimushina",
      "description": "Основатель Costa Rica Tures, организатор и координатор туров.",
      "jobTitle": "Основатель, организатор и координатор туров",
      "worksFor": { "@id": "https://costaricatures.com/#travelagency" },
      "knowsLanguage": [
        { "@type": "Language", "name": "Russian", "alternateName": "ru" },
        { "@type": "Language", "name": "Spanish", "alternateName": "es" },
        { "@type": "Language", "name": "English", "alternateName": "en" }
      ],
      "sameAs": [
        "https://needguide.net/view_guide.php?user_id=19691"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://costaricatures.com/#david",
      "name": "Давид Гонсалес",
      "alternateName": "David Gonzalez",
      "description": "Главный гид, гид-костариканец, свободно говорящий по-русски.",
      "jobTitle": "Главный гид",
      "worksFor": { "@id": "https://costaricatures.com/#travelagency" },
      "knowsLanguage": [
        { "@type": "Language", "name": "Russian", "alternateName": "ru" },
        { "@type": "Language", "name": "Spanish", "alternateName": "es" },
        { "@type": "Language", "name": "English", "alternateName": "en" }
      ],
      "sameAs": [
        "https://needguide.net/view_guide.php?user_id=22898"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://costaricatures.com/#website",
      "url": "https://costaricatures.com/",
      "name": "Costa Rica Tures",
      "inLanguage": ["ru", "es", "en"],
      "publisher": { "@id": "https://costaricatures.com/#travelagency" }
    }
  ]
}
```

### 8.2 Требования

- `type="application/ld+json"`, не `ld-json`.
- `logo` — реальный файл, не главная страница.
- `image` — реальное фото тура, не логотип.
- `@id` — стабильные идентификаторы.
- `sameAs` — только реальные профили, не домашние страницы.
- `sameAs` у `Person` — только личные профили. Facebook/Instagram — профили компании, оставить их только у `TravelAgency`.
- NeedGuide: `user_id=19691` — профиль Ольги, `user_id=22898` — профиль Давида (уточнить соответствие перед релизом).
- `Person.image` добавлять только после появления реальных фото `public/team/olga.jpg` и `public/team/david.jpg`.
- `foundingDate: "2018"` оставить только если это подтверждено; формулировку `10+ лет` проверить отдельно.
- `telephone` — основной номер Ольги.
- `email` — рабочий email.
- `address` — Alajuela, Grecia, Costa Rica; улица уже есть в контактах сайта (`src/widgets/contacts/contacts-2.tsx:50`). Если юридический адрес другой — заменить до релиза.
- `priceRange` — `$$`.
- `legalName` — `SRL Oldaga Group`.
- Не добавлять `aggregateRating`, `review` и выдуманные отзывы.
- `TouristTrip`/`Product` с ценами — отдельный этап после унификации `minPrice` и `adultPrice`.

### 8.3 FAQPage

Для каждой языковой версии `/faq/`:

```json
{
  "@type": "FAQPage",
  "@id": "https://costaricatures.com/faq/#faq",
  "url": "https://costaricatures.com/faq/",
  "inLanguage": "ru",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как заказать трансфер в Коста-Рике у русскоговорящего гида?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Заказать трансфер и авторские туры по Коста-Рике можно у русскоговорящего гида Ольги Наймушиной через компанию Costa Rica Tures."
      }
    }
  ]
}
```

Для `/es/faq/` и `/en/faq/` — свои `url`, `@id` и `inLanguage`.

### 8.4 AboutPage

Для страницы `/about/` добавить `AboutPage`, связывающий страницу с компанией и командой:

```json
{
  "@type": "AboutPage",
  "@id": "https://costaricatures.com/about/#webpage",
  "url": "https://costaricatures.com/about/",
  "inLanguage": "ru",
  "mainEntity": { "@id": "https://costaricatures.com/#travelagency" },
  "about": [
    { "@id": "https://costaricatures.com/#travelagency" },
    { "@id": "https://costaricatures.com/#olga" },
    { "@id": "https://costaricatures.com/#david" }
  ]
}
```

Для `/es/about/` и `/en/about/` — свои `url`, `@id` и `inLanguage`.

## 9. Head, canonical и hreflang

На каждой странице через Vike `+Head`:

```html
<title>Русскоговорящий гид в Коста-Рике — Ольга Наймушина | Costa Rica Tures</title>
<meta name="description" content="Индивидуальные туры, экскурсии и трансферы в Коста-Рике с русскоговорящим гидом Ольгой Наймушиной." />
<link rel="canonical" href="https://costaricatures.com/" />
<link rel="alternate" hreflang="ru" href="https://costaricatures.com/" />
<link rel="alternate" hreflang="es" href="https://costaricatures.com/es/" />
<link rel="alternate" hreflang="en" href="https://costaricatures.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://costaricatures.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://costaricatures.com/" />
<meta property="og:image" content="https://costaricatures.com/og/cover.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

Требования:

- canonical — всегда основной домен, без `www`;
- `hreflang` — на всех страницах, не только на главной;
- `x-default` → `/`;
- `og:locale` — `ru_RU`, `es_CR`, `en_US`;
- `<html lang>` — `ru`/`es`/`en`;
- текущие `meta keywords` убрать или локализовать: Google и AI их не используют, а испанские ключи на русской странице выглядят нерелевантно.

## 10. Sitemap, robots, llms.txt

### 10.1 `sitemap.xml`

Сгенерировать все 21 URL (на этапе сборки из тех же per-page `+onBeforePrerenderStart`-списков, либо статическим файлом):

- `/`, `/about/`, `/faq/`, `/tour-info/1..4/`;
- `/es/...`;
- `/en/...`.

Для каждого URL указать `lastmod` и языковые альтернативы.

### 10.2 `robots.txt`

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://costaricatures.com/sitemap.xml
```

Убрать `test.* form.*` и заглушку `example.com`.

### 10.3 `llms.txt`

Добавить краткую карту сайта:

- кто такой гид;
- какие услуги;
- языки;
- ключевые URL, включая `/about/`;
- контакты;
- ссылки на FAQ и туры.

## 11. Изображения и бренд

- Логотип: `src/assets/logo/logo_black.png` (2481×242), скопировать в `public/logo.png`.
- `logo_white.png` — для тёмных фонов, в Schema.org не использовать.
- `image`/OG: фото тура, например `main_photo_1.jpeg` (1280×614), подготовить `public/og/cover.jpg` 1200×630.
- Favicon уже есть: `public/favicon.svg`.
- Фото команды: `public/team/olga.jpg`, `public/team/david.jpg`; до получения — placeholder без выдуманных лиц.
- В alt писать, что на фото и где это в Коста-Рике; не оставлять пустые alt у ключевых изображений.

## 12. Домены и `sameAs`

- Основной домен: `https://costaricatures.com/`.
- `https://www.costaricatures.com/` → 301 на основной.
- `http://` → 301 на `https://`.
- `https://turescostarica.com/` и `www` → 301 на основной.
- В canonical, sitemap, hreflang и Schema.org — только основной домен.
- `sameAs` — не альтернативные домены, а профили:
  - Facebook: `https://www.facebook.com/Brokertour.ru`;
  - Instagram: `https://www.instagram.com/costarica_travelideas/`;
  - NeedGuide Ольги: `https://needguide.net/view_guide.php?user_id=19691`;
  - NeedGuide Давида: `https://needguide.net/view_guide.php?user_id=22898`;
  - Google Business Profile / Google Maps;
  - Tripadvisor;
  - Turtella;
  - Telegram-канал.
- NeedGuide профили гидов идут в `Person.sameAs`, а не в `TravelAgency.sameAs`, если это личные профили.
- Если профиля нет — не добавлять.

## 13. Проверка

### 13.1 HTML без JS

```bash
curl -sS https://costaricatures.com/ | grep -q "<h1"
curl -sS https://costaricatures.com/ | grep -q "Ольга Наймушина"
curl -sS https://costaricatures.com/ | grep -q "Русскоговорящий гид"
curl -sS https://costaricatures.com/faq/ | grep -q "<details"
curl -sS https://costaricatures.com/about/ | grep -q "Давид Гонсалес"
curl -sS https://costaricatures.com/about/ | grep -q "NeedGuide"
curl -sS https://costaricatures.com/es/ | grep -q 'lang="es"'
curl -sS https://costaricatures.com/en/tour-info/1/ | grep -q 'lang="en"'
curl -sS -A "GPTBot" https://costaricatures.com/ | grep -q "<h1"
curl -sS -A "PerplexityBot" https://costaricatures.com/ | grep -q "<h1"
```

### 13.2 Валидаторы

- Schema Markup Validator;
- Google Rich Results Test;
- Lighthouse SEO;
- проверка canonical/hreflang вручную;
- `view-source` без выполнения JS.

### 13.3 Критерии

- H1 ровно один на страницу.
- H1 содержит ключевую фразу.
- `/about/` существует на трёх языках, содержит команду, услуги и ссылки NeedGuide.
- У карточек Ольги и Давида есть место под фото.
- FAQ-ответы в HTML.
- Навигация и карточки — `<a href>`.
- JSON-LD валиден; в графе есть `Person` Ольги и `Person` Давида, `employee` и NeedGuide `sameAs`.
- `sameAs` — реальные профили.
- Нет выдуманных рейтингов.
- Sitemap содержит все URL.
- `robots.txt` без заглушек.
- `llms.txt` доступен.

## 14. Вне рамок

- Внешние статьи, форумы, Reddit, VC.ru, Дзен — задача заказчика.
- Покупка ссылок и отзывов.
- Гарантия попадания в рекомендации ChatGPT/Gemini/Perplexity.
- `TouristTrip`/`Product` с ценами — следующий этап.
- Полный аудит внешних профилей.
