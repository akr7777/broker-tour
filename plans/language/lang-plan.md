# План: языковые версии сайта (URL-based i18n)

> Связанные планы:
>
> - миграция на Vike и SSG: `plans/vike/vike-plan.md`;
> - SEO/GEO, Schema.org, H1, FAQ и sitemap: `plans/geo/geo-plan.md`;
> - деплой и nginx: `DEPLOYMENT.md`.
>
> План заменяет предыдущую идею «определять язык только по браузеру». Для SEO/GEO язык должен определяться URL, а `localStorage` — только хранить явный выбор пользователя.

## 1. Цель

Сделать три полноценные языковые версии сайта с отдельными индексируемыми URL:

- `/` — русский;
- `/es/` — испанский;
- `/en/` — английский.

Требования:

- язык страницы определяется URL, а не `navigator.language`;
- явный выбор пользователя запоминается в `localStorage` под ключом `language`;
- роботы и пользователи без сохранённого выбора видят русский корень;
- переключение языка сохраняет текущий маршрут и hash;
- у каждой страницы есть canonical и `hreflang`;
- на каждом URL корректный `<html lang>`;
- сборка пререндерит все страницы на трёх языках.

## 2. Текущее состояние

- `src/i18/i18init.ts`: глобальный i18next, `lng: LANGUAGES.ES` и `fallbackLng: LANGUAGES.ES` (`:21-22`).
- `src/App.tsx:64-68`: ручное чтение `localStorage.language` и `i18n.changeLanguage`.
- `src/components/languageChanger/languageChanger.tsx:25-29`: то же самое; `:41` записывает выбор в `localStorage`.
- `index.html:2`: статический `<html lang="ru">`.
- Русский перевод уже есть в `src/i18/lang-ru.json`; не хватает 3 ключей `tours.tour3.*`.
- В испанском не хватает 5 ключей, в английском — 14.
- Маршруты не содержат языкового префикса; все языки живут на одном URL.
- `LanguageChanger` использует `<img onClick>`, а не ссылки.
- Нет `hreflang`, canonical и языкового sitemap.
- Тест-раннера нет; тесты добавляются в рамках миграции.

## 3. Принятые решения

| Вопрос | Решение |
|---|---|
| Язык по умолчанию | `ru` |
| Корень сайта | `/` — русская версия |
| Языковые URL | `/es/`, `/en/`; отдельного `/ru/` нет |
| fallback i18n | `ru` как страховка от отсутствующих ключей |
| Хранение явного выбора | `localStorage.language` (`ru`/`es`/`en`) |
| Автоопределение по браузеру | не используется для рендера и редиректов |
| Авторедирект | только с `/` и только по сохранённому явному выбору |
| Глубокие ссылки | не редиректятся |
| Переключение языка | переход на тот же путь с другим префиксом |
| Языковые ссылки | реальные `<a href>` |
| Slash-политика | `/es/`, `/en/`, `/faq/`, `/tour-info/1/` |
| `hreflang` | `ru`, `es`, `en`, `x-default` → `/` |
| i18n при SSG | отдельный инстанс на страницу |

## 4. URL-схема

| Страница | RU | ES | EN |
|---|---|---|---|
| Главная | `/` | `/es/` | `/en/` |
| FAQ | `/faq/` | `/es/faq/` | `/en/faq/` |
| Тур 1 | `/tour-info/1/` | `/es/tour-info/1/` | `/en/tour-info/1/` |
| Тур 2 | `/tour-info/2/` | `/es/tour-info/2/` | `/en/tour-info/2/` |
| Тур 3 | `/tour-info/3/` | `/es/tour-info/3/` | `/en/tour-info/3/` |
| Тур 4 | `/tour-info/4/` | `/es/tour-info/4/` | `/en/tour-info/4/` |

Канонический URL всегда с завершающим слэшем, кроме корня `/`.

`hreflang` для каждой страницы:

```html
<link rel="alternate" hreflang="ru" href="https://costaricatures.com/faq/" />
<link rel="alternate" hreflang="es" href="https://costaricatures.com/es/faq/" />
<link rel="alternate" hreflang="en" href="https://costaricatures.com/en/faq/" />
<link rel="alternate" hreflang="x-default" href="https://costaricatures.com/faq/" />
```

## 5. Определение языка

Алгоритм:

1. Разобрать `URL pathname`.
2. Если первый сегмент `es` или `en` — это язык страницы, префикс убрать для маршрутизации.
3. Если префикса нет — язык `ru`.
4. Неизвестный префикс (например, `/de/`) — 404, а не молчаливый русский.
5. `localStorage` не участвует в выборе языка рендера.
6. `fallbackLng: 'ru'` используется только для отсутствующих переводов.

Примеры:

| URL | Язык |
|---|---|
| `/` | `ru` |
| `/tour-info/2/` | `ru` |
| `/es/` | `es` |
| `/es/tour-info/2/` | `es` |
| `/en/faq/` | `en` |
| `/de/` | 404 |

## 6. `localStorage` и авторедирект

Ключ: `language`. Значения: `ru`, `es`, `en`.

Правила:

- записывать только при явном клике по языку;
- не записывать язык, определённый по URL или браузеру;
- `localStorage` может быть недоступен — оборачивать чтение/запись в `try/catch`;
- на сервере `localStorage` не читается.

Авторедирект:

- выполняется только на клиенте после гидрации;
- только если `pathname === '/'`;
- только если в `localStorage` лежит `es` или `en`;
- переход на `/es/` или `/en/` с `replace: true`, сохраняя hash;
- глубокие ссылки (`/tour-info/1/`, `/faq/`) не редиректятся;
- `navigator.language` не используется;
- при отсутствии `localStorage` или ошибке — остаёмся на `/`;
- защита от циклов: на `/es/` и `/en/` редирект не выполняется.

Псевдокод:

```ts
const stored = readStoredLanguage()
if (pathname === '/' && (stored === 'es' || stored === 'en')) {
    navigate(`/${stored}/${location.hash}`, { replace: true })
}
```

## 7. i18n при SSG

Проблема: один глобальный i18next-инстанс при параллельном пререндере может смешивать языки между страницами.

Решение:

- создать фабрику `createI18n(lng)`;
- для каждой страницы создавать/получать инстанс через `pageContext` (например, в `+onBeforeRender`/layout);
- передавать инстанс в `I18nextProvider`;
- `toursContent(i18n)` и `faq_Data(i18n)` принимают инстанс или `t` и не используют глобальный `i18next`;
- `PriceCalculation2` берёт язык из `useTranslation()`, а не из `i18next.language`;
- `LanguageChanger` не меняет глобальный язык, а переходит на языковой URL;
- `<html lang>` выставляется через `+lang.ts` (настройка `lang` из `vike-react`): функция возвращает `pageContext.routeParams.lang`.
- Проверено на PoC: `/` → `lang="ru"`, `/es/` → `lang="es"`, `/en/` → `lang="en"`.

Если per-page i18n временно сложен, допустим `prerender: { parallel: false }` как аварийный вариант, но целевое решение — изоляция по странице.

## 8. Изменения по файлам

### 8.1 `src/i18/langs.ts`

Добавить:

- `DEFAULT_LANGUAGE = LANGUAGES.RU`;
- `SUPPORTED_LANGUAGES`;
- `isLanguage`;
- `languageFromPath`;
- `pathForLanguage`;
- `localizedPath(path, language)`.

### 8.2 `src/i18/i18-config.ts` (новый)

- ресурсы `ru`/`es`/`en`;
- `supportedLngs`;
- `fallbackLng: LANGUAGES.RU`;
- без `lng` и без `LanguageDetector` для серверного рендера.

### 8.3 `src/i18/i18init.ts`

- заменить глобальный `init` на фабрику;
- для клиента и сервера использовать один и тот же набор опций;
- `debug` только в dev;
- не вызывать `changeLanguage` из компонентов.

### 8.4 `src/App.tsx` / `src/main.tsx`

- удалить `createBrowserRouter`, `Helmet`, ручное чтение `localStorage`;
- точка входа и layout переходят в Vike (`pages/+Layout`, `+client`, `+Head`);
- создать `pages/+lang.ts`, возвращающий `pageContext.routeParams.lang`;
- `Provider` и `ToastContainer` переносятся в клиентский layout.

### 8.5 `src/components/languageChanger/languageChanger.tsx`

- заменить `<img onClick>` на `<a href>` с флагами;
- при клике: сохранить `localStorage.language`, перейти на `localizedPath(currentPath, lang)`;
- сохранить hash;
- не вызывать `i18n.changeLanguage` напрямую;
- `localStorage` — только в обработчике события;
- ссылки должны быть видны роботам.

### 8.6 `src/store/tour-info.ts`

- `toursContent(i18n)` или `toursContent(t)`;
- `tourPlanCreator` принимает `t`/`i18n`;
- не читать глобальный `i18next` внутри данных.

### 8.7 `src/store/consts.ts`

- `faq_Data(i18n)` или `faq_Data(t)`;
- не использовать глобальный `i18next`.

### 8.8 `src/widgets/price-calculation-2/price-calculation-2.tsx`

- убрать `import i18next` и `i18next.language`;
- использовать `const { t, i18n } = useTranslation()`.

### 8.9 `src/widgets/faq/faq.tsx`

- перейти на `<details>/<summary>`, чтобы ответы были в HTML;
- сохранить аккордеонный вид через CSS;
- данные брать из `faq_Data(i18n)`.

### 8.10 `src/shared/title/title.tsx`

- на сервере заголовок должен быть видимым;
- анимацию включать после монтирования;
- добавить уровень заголовка (`h1`/`h2`/`h3`).

### 8.11 `src/i18/lang-*.json`

- заполнить отсутствующие ключи;
- добавить H1/About/FAQ-тексты с именем Ольги;
- синхронизировать ключи между `ru`, `es`, `en`.

### 8.12 `AGENTS.md`

Обновить после реализации:

- язык определяется URL, а не браузером;
- `localStorage.language` — только явный выбор;
- fallback `ru`;
- авторедирект только с `/`;
- добавить `pnpm test`;
- описать Vike/SSG и ссылку на `plans/vike/vike-plan.md`.

## 9. Тесты

Добавить Vitest + jsdom (в рамках Vike-плана).

Тесты:

- `languageFromPath('/') === 'ru'`;
- `languageFromPath('/es/') === 'es'`;
- `languageFromPath('/en/tour-info/1/') === 'en'`;
- `languageFromPath('/de/')` → ошибка/404;
- `localizedPath('/tour-info/1/', 'en') === '/en/tour-info/1/'`;
- `localizedPath('/', 'es') === '/es/'`;
- fallback `ru` при отсутствующем ключе;
- SSR-рендер каждой страницы на каждом языке не содержит текста другого языка;
- авторедирект с `/` при `localStorage.language = 'en'` → `/en/`;
- глубокие ссылки не редиректятся;
- на `/es/` и `/en/` нет редиректа;
- `<html lang>` соответствует URL;
- `hreflang` и canonical присутствуют;
- ссылки переключателя языка имеют корректные `href`.

## 10. Ручная проверка

1. Запустить `pnpm dev`.
2. Очистить `localStorage.language`.
3. Проверить:

| URL | Ожидание |
|---|---|
| `/` | русский, `lang="ru"` |
| `/es/` | испанский, `lang="es"` |
| `/en/` | английский, `lang="en"` |
| `/tour-info/2/` | русский тур 2 |
| `/es/tour-info/2/` | испанский тур 2 |
| `/de/` | 404 |
| `/faq` | 301 → `/faq/` |
| `/es` | 301 → `/es/` |

4. Выбрать английский, проверить `localStorage.language === 'en'` и URL.
5. Перезагрузить `/` — должен произойти переход на `/en/`.
6. Открыть `/tour-info/1/` при `language = 'en'` — редиректа быть не должно.
7. Проверить сохранение hash при смене языка.
8. Проверить `view-source` и `curl` без JS.

## 11. Критерии готовности

- `/` отдаёт русскую версию.
- `/es/` и `/en/` отдают соответствующие версии.
- Все 18 страниц пререндерены.
- `<html lang>` соответствует языку.
- Canonical и `hreflang` корректны.
- Явный выбор сохраняется в `localStorage`.
- Авторедирект работает только с `/`.
- Нет редиректа по `navigator.language`.
- Переключение языка сохраняет путь и hash.
- Нет смешивания языков при SSG.
- `pnpm exec tsc --noEmit`, `pnpm test`, `pnpm lint`, `pnpm build` проходят.

## 12. Риски и откат

- **Смена языка корня влияет на испанское SEO.** `/` станет русским, испанский уедет на `/es/`; старые ссылки на `/tour-info/1/` начнут отдавать русскую версию. Это принятое решение.
- **Редирект-петля.** Проверять, что на `/es/` и `/en/` редирект не выполняется.
- **`localStorage` недоступен.** Все обращения в `try/catch`.
- **Неверный парсинг пути.** Покрыть тестами `/`, `/es/`, `/en/`, вложенные пути и неизвестные префиксы.
- **Глобальный i18n.** Не оставлять `i18next.t()` в данных и компонентах без инстанса.
- **Trailing slash.** Настроить 301 в nginx и canonical.
- Откат: вернуть предыдущую реализацию i18n и `LanguageChanger`; данные не мигрируются, ключ `language` остаётся совместимым.

## 13. Вне рамок

- Новые языки, кроме `ru`/`es`/`en`.
- Перевод URL-слагов (оставляем одинаковую структуру).
- Серверное определение языка по `Accept-Language`.
- Автоматический перевод контента.
- Изменение дизайна переключателя языка, кроме замены на ссылки.
