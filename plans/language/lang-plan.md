# План: автоопределение языка браузера (i18n)

> Отдельная задача, не связанная с EmailJS. Конфигурация EmailJS описана в `plans/emailjs/emailjs-plan.md`.

## 1. Цель

При первом заходе определять язык интерфейса по языковым предпочтениям браузера пользователя. Явный выбор пользователя должен сохраняться между визитами. Если браузерный язык не поддерживается — показывать испанский.

Поддерживаемые языки: `es`, `en`, `ru`.

## 2. Контекст проекта

- Стек: Vite + React 18 + TypeScript, i18next + react-i18next.
- Инициализация i18n: `src/i18/i18init.ts`.
- Поддерживаемые языки и ключ localStorage: `src/i18/langs.ts` (`LanguageLC = 'language'`).
- Переключатель языка: `src/components/languageChanger/languageChanger.tsx`.
- Точка входа: `src/App.tsx`, там же сейчас есть ручная работа с localStorage.
- `i18next-browser-languagedetector` уже присутствует в `package.json:22`, устанавливать новую зависимость не нужно.
- Автотестов и тест-раннера в проекте нет. В рамках этой задачи добавляются Vitest + jsdom и тесты детекции (см. 5.6).

## 3. Текущее состояние

- В `src/i18/i18init.ts`:
  - импорт `LanguageDetector` закомментирован (`:2`);
  - `.use(LanguageDetector)` закомментирован (`:13`);
  - явно задан `lng: LANGUAGES.ES` (`:21`);
  - `fallbackLng: LANGUAGES.ES`.
- `src/App.tsx` (`:64-68`) вручную читает `localStorage.language` и вызывает `i18n.changeLanguage`.
- `src/components/languageChanger/languageChanger.tsx`:
  - `:25-29` делает то же самое;
  - `:41` сохраняет выбранный язык в `localStorage` под ключом `language`.
- `index.html:2` содержит `<html lang="ru">`.
- `LanguageChanger` сравнивает `i18n.language` строго с `LANGUAGES.ES`, `LANGUAGES.EN`, `LANGUAGES.RU` (`:64`, `:70`, `:76`).
- Без явного выбора пользователь всегда видит испанский.

## 4. Принятые решения

| Вопрос | Решение |
|---|---|
| Порядок определения | сначала `localStorage`, затем `navigator` |
| `htmlTag` | исключить из `detection.order` |
| Автосохранение определённого языка | не сохранять (`caches: []`) |
| Сохранение явного выбора | оставить ручную запись в `LanguageChanger` |
| Fallback | испанский (`es`) |
| Региональные коды | нормализовать через `convertDetectedLanguage` |
| `load: 'languageOnly'` | не добавлять |
| `<html lang>` | статически `es`, динамически обновлять при смене языка |
| Дублирующее чтение localStorage | удалить из `App.tsx` и `LanguageChanger` |
| Автотесты | добавить Vitest + jsdom и тесты детекции |

### Важно: почему не `load: 'languageOnly'`

В i18next v23 при `load: 'languageOnly'` функция `getBestMatchFromCodes` может вернуть исходный региональный код (`ru-RU`), хотя переводы загрузятся для `ru`. Тогда `i18n.language` станет `'ru-RU'`, а строгие сравнения в `LanguageChanger` (`i18n.language === 'ru'`) перестанут работать, и флаг языка не отобразится.

Надёжнее нормализовать код до i18next:

```ts
convertDetectedLanguage: (lng: string) => lng.trim().split(/[-_]/)[0].toLowerCase(),
```

Тогда `ru-RU` → `ru`, `en-US` → `en`, `'RU'` → `ru`, `' ru-RU '` → `ru`.

## 5. Изменения по файлам

### 5.1 `src/i18/i18-config.ts` (новый) и `src/i18/i18init.ts`

Вынести конфигурацию в отдельный модуль без побочных эффектов, чтобы её можно было использовать в тестах.

`src/i18/i18-config.ts`:

```ts
import ruTranslation from "./lang-ru.json";
import esTranslation from "./lang-es.json";
import enTranslation from "./lang-en.json";
import { LANGUAGES, LanguageLC } from "./langs";

export const normalizeLanguage = (lng: string) =>
    lng.trim().split(/[-_]/)[0].toLowerCase();

export const i18nInitOptions = {
    supportedLngs: [LANGUAGES.ES, LANGUAGES.EN, LANGUAGES.RU],
    resources: {
        es: { translation: esTranslation },
        ru: { translation: ruTranslation },
        en: { translation: enTranslation },
    },
    fallbackLng: LANGUAGES.ES,
    detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: LanguageLC,
        caches: [],
        convertDetectedLanguage: normalizeLanguage,
    },
};
```

`src/i18/i18init.ts`:

```ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "./langs";
import { i18nInitOptions, normalizeLanguage } from "./i18-config";

const supportedLanguages = new Set<string>(Object.values(LANGUAGES));

const syncHtmlLang = (lng: string) => {
    if (typeof document === "undefined") return;
    const normalized = normalizeLanguage(lng);
    document.documentElement.lang = supportedLanguages.has(normalized) ? normalized : LANGUAGES.ES;
};

i18n.on('languageChanged', syncHtmlLang);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ...i18nInitOptions,
        debug: import.meta.env.DEV,
    });

syncHtmlLang(i18n.language || LANGUAGES.ES);
```

Обязательные условия:

- **Удалить `lng: LANGUAGES.ES`**. Если оставить `lng`, детектор не будет использоваться.
- **Не добавлять `load: 'languageOnly'`** по причине из раздела 4.
- `caches: []` нужен, чтобы автоопределённый язык не записывался в localStorage. Иначе после первого захода браузерные настройки перестанут учитываться.
- `lookupLocalStorage: LanguageLC` нужен, чтобы детектор читал существующий ключ `language`, а не дефолтный `i18nextLng`.
- `normalizeLanguage` нормализует регистр, пробелы и региональный суффикс, чтобы `'RU'`, `' ru-RU '` и `ru-RU` приводились к `ru`.
- `syncHtmlLang` использует ту же нормализацию, ставит `<html lang>` только из списка поддерживаемых языков и не падает в не-браузерном окружении.

### 5.2 `src/App.tsx`

Удалить импорт:

```ts
import { LanguageLC, LanguagesType } from "./i18/langs";
```

Удалить блок ручной синхронизации:

```ts
const currentLanguageLC: LanguagesType | null = localStorage.getItem(LanguageLC)

if (currentLanguageLC && i18n.language !== currentLanguageLC) {
    i18n.changeLanguage(currentLanguageLC)
}
```

Оставить `const { i18n } = useTranslation();`, потому что `i18n.t('site_title')` и `i18n.t('site_description')` продолжают использоваться.

После удаления чтения localStorage язык будет определяться один раз в `i18init.ts`, а явный выбор — читаться детектором.

### 5.3 `src/components/languageChanger/languageChanger.tsx`

Удалить блок чтения и принудительной смены языка:

```ts
const currentLanguageLC: LanguagesType | null = localStorage.getItem(LanguageLC)

if (currentLanguageLC && i18n.language !== currentLanguageLC) {
    i18n.changeLanguage(currentLanguageLC)
}
```

Оставить запись при выборе языка, но не прерывать смену языка, если localStorage недоступен:

```ts
try {
    localStorage.setItem(LanguageLC, newLang)
} catch {
    // localStorage may be unavailable in private mode
}
i18n.changeLanguage(newLang)
```

Импорты `LANGUAGES`, `LanguageLC`, `LanguagesType` остаются нужны.

### 5.4 `index.html`

Изменить:

```diff
-<html lang="ru">
+<html lang="es">
```

Поскольку `htmlTag` исключён из детекции, на определение языка это не влияет. Атрибут приводится в соответствие с fallback-языком; после загрузки JS он обновляется через `languageChanged`.

### 5.5 `AGENTS.md`

Обновить раздел `i18n`:

- язык определяется по `localStorage.language`, затем по `navigator.languages`;
- `htmlTag` намеренно не используется;
- автоматически определённый язык не кешируется (`caches: []`);
- явный выбор сохраняется в `language` компонентом `LanguageChanger`;
- fallback — испанский;
- нельзя добавлять `lng` в `init`, иначе детектор не запустится;
- нельзя добавлять `load: 'languageOnly'` без нормализации, иначе возможен `i18n.language = 'ru-RU'`;
- `convertDetectedLanguage` нормализует регистр, пробелы и региональный суффикс;
- `document.documentElement.lang` синхронизируется через `languageChanged` и ограничен списком поддерживаемых языков.

Обновить `Commands` и `Testing`:

- добавить `pnpm test` (Vitest) и `pnpm exec vitest run src/i18/i18init.test.ts` для одного файла;
- убрать утверждение, что тест-раннера нет;
- указать, что тесты лежат рядом с кодом в `*.test.ts(x)`, окружение — jsdom.

### 5.6 Тесты: Vitest + jsdom

Добавить dev-зависимости:

```bash
pnpm add -D vitest@^2 jsdom
```

`package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        clearMocks: true,
    },
});
```

`src/i18/i18init.test.ts`:

```ts
import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { i18nInitOptions } from './i18-config';

const setNavigatorLanguages = (languages: string[]) => {
    Object.defineProperty(window.navigator, 'languages', {
        configurable: true,
        value: languages,
    });
    Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        value: languages[0],
    });
};

const createTestI18n = () => {
    const instance = createInstance();
    instance.use(LanguageDetector).init({
        ...i18nInitOptions,
        detection: { ...i18nInitOptions.detection },
        debug: false,
    });
    return instance;
};

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    Reflect.deleteProperty(window.navigator, 'languages');
    Reflect.deleteProperty(window.navigator, 'language');
});

describe('i18n language detection', () => {
    it('uses the first supported navigator language', () => {
        setNavigatorLanguages(['ru-RU', 'en-US']);
        expect(createTestI18n().language).toBe('ru');
    });

    it('respects the navigator language order', () => {
        setNavigatorLanguages(['en-US', 'ru-RU']);
        expect(createTestI18n().language).toBe('en');
    });

    it('skips unsupported languages', () => {
        setNavigatorLanguages(['de-DE', 'en-US', 'ru-RU']);
        expect(createTestI18n().language).toBe('en');
    });

    it('falls back to Spanish', () => {
        setNavigatorLanguages(['de-DE', 'fr-FR']);
        expect(createTestI18n().language).toBe('es');
    });

    it('prefers the explicit localStorage choice', () => {
        localStorage.setItem('language', 'en');
        setNavigatorLanguages(['ru-RU', 'en-US']);
        expect(createTestI18n().language).toBe('en');
    });

    it('normalizes case and region in localStorage', () => {
        localStorage.setItem('language', ' RU ');
        setNavigatorLanguages(['en-US']);
        expect(createTestI18n().language).toBe('ru');
    });

    it('does not cache the auto-detected language', () => {
        setNavigatorLanguages(['ru-RU']);
        createTestI18n();
        expect(localStorage.getItem('language')).toBeNull();
    });
});
```

Тесты лежат в `src`, поэтому `pnpm exec tsc --noEmit` их типизирует; `vite build` их не бандлит.

Запуск всех тестов: `pnpm test`. Запуск одного файла: `pnpm exec vitest run src/i18/i18init.test.ts`.

## 6. Как работает определение при нескольких языках

Браузер отдаёт `navigator.languages` — упорядоченный список предпочтений. i18next выбирает первый код, который присутствует в `supportedLngs`.

Примеры:

| `navigator.languages` | Результат |
|---|---|
| `['ru-RU', 'en-US']` | `ru` |
| `['en-US', 'ru-RU']` | `en` |
| `['de-DE', 'en-US', 'ru-RU']` | `en` |
| `['de-DE', 'fr-FR']` | `es` (fallback) |

Если пользователь уже выбирал язык вручную, `localStorage.language` имеет приоритет над `navigator.languages`.

## 7. Проверка

### 7.1 Команды

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm build
```

`pnpm build` уже включает `tsc`, но отдельный typecheck нужен для быстрой проверки. `pnpm install` обязателен в чистом окружении без `node_modules`.

### 7.2 Ручная проверка

1. Запустить `pnpm dev`.
2. В DevTools выполнить `localStorage.removeItem('language')` и перезагрузить страницу. Перед каждым сценарием с «нет» в таблице очищать ключ повторно.
3. Настроить порядок языков в браузере:
   - Chrome: `chrome://settings/languages`, добавить языки и перетащить нужный наверх, перезапустить браузер;
   - Firefox: Settings → General → Language → Choose your preferred language for displaying pages;
   - проверить фактический порядок в консоли: `navigator.languages`.
4. Прогнать сценарии:

| # | `localStorage.language` | `navigator.languages` | Ожидание |
|---|---|---|---|
| 1 | нет | `['ru-RU', 'en-US']` | русский |
| 2 | нет | `['en-US', 'ru-RU']` | английский |
| 3 | нет | `['de-DE', 'en-US']` | английский |
| 4 | нет | `['de-DE', 'fr-FR']` | испанский |
| 5 | `'en'` | `['ru-RU', 'en-US']` | английский |
| 6 | нет, затем выбрать русский в UI и перезагрузить | `['en-US', 'ru-RU']` | русский |
| 7 | `' RU '` | `['en-US']` | русский (нормализация регистра и пробелов) |

5. В каждом сценарии проверить:
   - язык текста на странице;
   - отображение правильного флага в переключателе языка;
   - `document.documentElement.lang`;
   - отсутствие ошибок в консоли.
6. Дополнительно проверить:
   - после автоопределения без ручного выбора `localStorage.getItem('language') === null`;
   - после ручного выбора ключ равен выбранному коду;
   - в dev-консоли `debug` показывает `languageChanged` с кодом без региона (`ru`, `en`, `es`).

### 7.3 Автотесты

Автотесты добавляются в рамках этой задачи (см. 5.6). Запуск всех тестов: `pnpm test`. Запуск только тестов детекции: `pnpm exec vitest run src/i18/i18init.test.ts`.

## 8. Критерии готовности

- При отсутствии `localStorage.language` язык определяется по `navigator.languages`.
- Первый поддерживаемый язык из списка браузера побеждает.
- Неподдерживаемые языки приводят к испанскому fallback.
- Явный выбор пользователя сохраняется и имеет приоритет.
- `i18n.language` содержит `ru`/`en`/`es`, а не `ru-RU`/`en-US`.
- `document.documentElement.lang` соответствует выбранному языку.
- Переключатель языка продолжает работать.
- `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` проходят.
- `AGENTS.md` обновлён.

## 9. Риски и откат

- **Оставлен `lng` в `init`** → детектор не работает. Проверить, что `lng` удалён.
- **Добавлен `load: 'languageOnly'` без нормализации** → `i18n.language` может стать `ru-RU`, сломаются сравнения и флаг. Использовать `convertDetectedLanguage`.
- **Оставлен `htmlTag` в `detection.order`** → при неподдерживаемом языке браузера русский `<html lang>` может стать неожиданным fallback.
- **Не задан `caches: []`** → первый автоопределённый язык навсегда сохранится в localStorage.
- **Удалена ручная запись в `LanguageChanger`** → явный выбор перестанет сохраняться. Её нужно оставить.
- **Несовместимая версия Vitest с Vite 5** → использовать `vitest@^2` (указано в 5.6).
- **localStorage недоступен** → `LanguageChanger` не должен падать; запись обёрнута в try/catch.
- Откат: вернуть изменения в `src/i18/i18-config.ts`, `src/i18/i18init.ts`, `src/App.tsx`, `languageChanger.tsx`, `index.html`, `package.json`, `vitest.config.ts`, `src/i18/i18init.test.ts` и `AGENTS.md`. Миграция данных не требуется; ключ `language` остаётся совместимым.

## 10. Информационная безопасность

- План не добавляет секретов, сетевых вызовов, авторизации и работы с персональными данными.
- `navigator.languages` читается только локально и никуда не отправляется.
- `localStorage.language` не содержит чувствительных данных; его подмена влияет только на язык интерфейса.
- i18next выбирает только код из `supportedLngs` или fallback, поэтому значение из localStorage не приводит к XSS через `<html lang>`.
- `syncHtmlLang` дополнительно ограничивает значение списком поддерживаемых языков.
- `debug` включён только в dev (`import.meta.env.DEV`); в production конфигурация и переводы не логируются.
- Новых production-зависимостей нет: `i18next-browser-languagedetector` уже присутствует в проекте; Vitest + jsdom добавляются только в devDependencies и не попадают в production bundle.
- `localStorage` в приватном режиме может быть недоступен; запись в `LanguageChanger` обёрнута в try/catch, а детектор сам проверяет доступность хранилища.

## 11. Вне рамок

- Настройка EmailJS и `.env.example` — отдельный план `plans/emailjs/emailjs-plan.md`.
- Добавление новых языков и переводов.
- Изменение UI переключателя языка.
- Серверное определение языка и SEO/hreflang.
- Изменение fallback на английский.
