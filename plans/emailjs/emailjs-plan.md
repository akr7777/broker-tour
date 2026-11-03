# План: внедрение EmailJS вместо backend-уведомлений

> Отдельная задача, не связанная с автоопределением языка. План языка описан в `plans/language/lang-plan.md`.

## 0. Решение по каналу

Telegram больше не нужен. EmailJS заменяет текущий backend-вызов, который инициировал Telegram-уведомление, на email-уведомление менеджеру. Telegram-бот, email-to-Telegram мост и другие Telegram-интеграции не реализуются.

Все Telegram-артефакты во фронтенде удаляются: `CONTACTS.telegram`, ссылка Telegram в контактах, CSS/keyframes и i18n-ключ `contacts.or` (см. 6.6).

## 1. Цель

Полностью заменить текущее обращение фронтенда в backend для уведомлений:

- активная форма бронирования тура должна отправлять уведомление через EmailJS;
- уведомление приходит на email менеджера (по умолчанию `CONTACTS.email`);
- из кода и env удаляются backend-URL, axios, мёртвая форма обратной связи и весь Telegram-легаси;
- добавляются `.env.example`, типизация env, обработка ошибок, защита от дублей, honeypot, reCAPTCHA v2, тесты и документация.

## 2. Текущее состояние

### 2.1 Активная форма

`src/components/contact-form/contact-form.tsx`:

- открывается из `src/components/buttons/buttonContact.tsx` по кнопке «Забронировать тур»;
- хранит телефон в локальном состоянии;
- отправляет `fetch(CONTACT_FORM_SEND_URL, ...)`, где `CONTACT_FORM_SEND_URL = import.meta.env.VITE_SERVER_URL`;
- тело запроса:
  ```json
  {
    "title": "<tourTitle>",
    "phone": "<phone>",
    "content": "Хочу забронировать тур <tourTitle>"
  }
  ```
- успех определяется по `data.status === 277`;
- статус отправки хранится в Redux (`bookTourSendStatus`):
  - `notSent` — показывать форму;
  - `delivered` — показывать успех;
  - `error` — показывать ошибку.
- сообщение `content` жёстко на русском независимо от языка интерфейса.

### 2.2 Мёртвая форма обратной связи

`src/widgets/contact-form-feedback/contact-form-feedback.tsx`:

- нигде не рендерится: импорт и JSX закомментированы в `src/shared/main-wrapper/main-wrapper.tsx`;
- использует отсутствующие в i18n ключи `contact_form.*`;
- отправляет `axios.get(VITE_SERVER_URL)` и `axios.post(VITE_SERVER_URL + '/contact_form', ...)`;
- показывает hardcoded русские toast-сообщения.

Этот компонент не является пользовательским функционалом и не нужен продукту. План удаляет его, `src/api/api.ts` и все упоминания, чтобы полностью убрать backend-зависимость. Восстановление формы обратной связи — отдельная задача с i18n-ключами и, при необходимости, отдельным EmailJS-шаблоном.

### 2.3 Backend/API-код

`src/api/api.ts`:

- создаёт axios-инстанс с `baseURL: import.meta.env.VITE_SERVER_URL`;
- экспортирует `ReqBodyType` и `feedbackAPI`;
- `feedbackAPI` используется только мёртвой формой обратной связи.

### 2.4 Env и зависимости

Сейчас используются:

- `VITE_SERVER_URL` — только формы и `src/api/api.ts`;
- `VITE_WEB_SITE_URL` — используется только в удаляемой форме обратной связи; после миграции отдельная переменная не нужна, потому что `page_url` уже содержит домен и путь.

`axios` и `@types/axios` нужны только для удаляемого API-кода.

### 2.5 Уведомления

Текущий backend отправлял Telegram-уведомление менеджеру. В репозитории нет кода Telegram-бота: это внешняя backend-логика. Telegram больше не нужен. После миграции канал уведомлений — email через EmailJS. Telegram-бот и его секреты выводятся из эксплуатации, а все Telegram-артефакты во фронтенде удаляются.

## 3. Принятые решения

| Вопрос | Решение |
|---|---|
| Канал уведомлений | email через EmailJS |
| Получатель | `CONTACTS.email` (`oldagatour@gmail.com`), настраивается в EmailJS-шаблоне |
| Шаблон | один шаблон для формы бронирования |
| SDK | `@emailjs/browser` |
| Переменные EmailJS | `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` |
| Приватные ключи | не используются и не попадают во фронтенд |
| Backend env | `VITE_SERVER_URL` и `VITE_WEB_SITE_URL` удаляются после миграции |
| Страница заявки | `page_url` = `window.location.href`; отдельный `origin` не передаётся |
| Мёртвая форма обратной связи | удалить вместе с `src/api/api.ts` |
| Axios | удалить из зависимостей |
| Тесты | Vitest + jsdom; если тест-раннер уже добавлен языковым планом — переиспользовать |
| Telegram | больше не нужен; бот, секреты и весь фронтенд-легаси удаляются |
| Telegram-ссылка в контактах | удалить вместе с `CONTACTS.telegram`, CSS и `contacts.or` |
| Защита от дублей | `isSending` + `disabled` + guard в обработчике |
| Honeypot | скрытое поле `company`; если заполнено — не отправлять |
| CAPTCHA | reCAPTCHA v2 checkbox + проверка в EmailJS-шаблоне |
| Секрет reCAPTCHA | только в EmailJS template settings, не во фронтенде |

### 3.1 Готовность к старту

Перед реализацией должны быть подтверждены внешние условия:

- [ ] EmailJS-аккаунт создан, email-сервис подключён и проверен.
- [ ] Создан шаблон с переменными из раздела 4.2; `To Email` указывает на реального получателя.
- [ ] Получены `Service ID`, `Template ID`, `Public Key`.
- [ ] В Dashboard → Account → Security → Domains добавлены localhost и production-домены.
- [ ] Зарегистрирован reCAPTCHA v2, получены Site Key и Secret Key; Secret Key добавлен в EmailJS template settings.
- [ ] В список доменов reCAPTCHA добавлены localhost и production-домены.
- [x] Подтверждено: Telegram больше не нужен; Telegram-бот, секреты и фронтенд-легаси удаляются.
- [x] Подтверждено удаление мёртвой формы `ContactFeedbackForm` и `src/api/api.ts`.
- [ ] Подтверждён получатель уведомлений (по умолчанию `CONTACTS.email`).
- [ ] Проверено, требуется ли обновление privacy policy из-за передачи телефона/текста заявки в EmailJS.

Если хотя бы один пункт не подтверждён, кодовая часть всё равно реализуема, но production-запуск и приёмка могут быть заблокированы.

## 4. Настройка EmailJS (ручные шаги до кода)

Эти шаги нельзя автоматизировать из репозитория. Их нужно выполнить в личном кабинете EmailJS и зафиксировать результат в env.

### 4.1 Аккаунт и email-сервис

1. Создать аккаунт EmailJS.
2. Добавить email-сервис (Gmail/Outlook/другой), с которого будут уходить письма.
3. Подтвердить адрес отправителя.
4. Проверить лимиты тарифа (количество писем в месяц/период). При превышении лимита `send` вернёт ошибку.

### 4.2 Шаблон письма

Создать шаблон «BrokerTour booking notification».

**To Email:** `oldagatour@gmail.com` (значение `CONTACTS.email`). Если получатель изменится, обновить шаблон в EmailJS.

**From Name:** `BrokerTour`.

**Subject:**

```text
[BrokerTour] Новая заявка: {{tour_title}}
```

**Body (plain text/HTML-шаблон без raw-вставок):**

```text
Новая заявка на бронирование

Тур: {{tour_title}}
Телефон: {{phone}}
Сообщение: {{message}}

Язык: {{language}}
Страница: {{page_url}}
Время: {{submitted_at}}
```

Использовать `{{variable}}`, а не `{{{variable}}}`. Не вставлять пользовательские значения в HTML без экранирования. Телефон и tour_title должны быть ограничены по длине на клиенте.

**Переменные шаблона (template params):**

Это параметры, которые фронтенд передаёт в EmailJS. Их не нужно путать с env-переменными `VITE_EMAILJS_*`.

| Переменная | Источник | Обязательность |
|---|---|---|
| `tour_title` | название тура | да |
| `phone` | введённый телефон | да |
| `message` | i18n-сообщение о бронировании | да |
| `language` | текущий язык i18n | да |
| `page_url` | `window.location.href` (содержит домен и путь) | да |
| `submitted_at` | ISO-время отправки | да |
| `g-recaptcha-response` | токен reCAPTCHA v2 | да |

`g-recaptcha-response` — специальное поле для EmailJS CAPTCHA. Его не нужно выводить в теле письма; EmailJS использует его для проверки.

При необходимости добавить `tour_id`, `user_email` и другие поля, но только после обновления кода и шаблона одновременно.

Отдельный `form_type` не передаётся: сейчас есть только один тип заявки — бронирование. Если появится вторая форма, добавить отдельный шаблон или поле `form_type` одновременно в код и шаблон.

### 4.3 Ключи и домены

1. Скопировать `Service ID`, `Template ID`, `Public Key` из EmailJS.
2. В EmailJS dashboard открыть **Account → Security → Domains** и добавить точные origins:
   - `http://localhost:5173` для локальной разработки;
   - production-домен(ы) сайта;
   - preview-домены, если используются.
3. Синтаксис домена: `<scheme>://<hostname>[:port]`, например `https://costaricatures.com` или `http://localhost:5173`. Используется заголовок `Origin`; добавлять нужно именно origin, без пути.
4. Не использовать wildcard, если можно указать точные домены.
5. reCAPTCHA v2 настраивается отдельно по разделу 4.5.
6. Если тариф и настройки позволяют — включить rate limiting.
7. Если список доменов пуст, public key технически можно использовать с любого origin. Для production обязательно заполнить allowlist.

### 4.4 Проверка шаблона

Отправить тестовое письмо из EmailJS dashboard. Убедиться, что все переменные подставляются и письмо не попадает в спам. Добавить адрес отправителя в контакты/белый список у менеджера.

### 4.5 Регистрация reCAPTCHA v2

EmailJS поддерживает **только reCAPTCHA v2** (checkbox), не v3.

1. Открыть [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create).
2. Указать Label, например `BrokerTour`.
3. Выбрать тип **reCAPTCHA v2 → «I'm not a robot» Checkbox**.
4. Добавить домены:
   - `localhost` для локальной разработки;
   - production-домен(ы);
   - preview-домены, если используются.
5. Принять условия и создать ключи.
6. Скопировать **Site Key** (публичный) и **Secret Key** (секретный).
7. **Site Key** добавить в `.env` как `VITE_RECAPTCHA_SITE_KEY`.
8. **Secret Key** добавить в EmailJS: шаблон → **Settings** → включить **reCAPTCHA V2 verification** и вставить секрет.
9. Secret Key не добавлять в `.env` с префиксом `VITE_`, не коммитить и не логировать.

Домены в Google reCAPTCHA и EmailJS — это два разных allowlist. Нужно заполнить оба.

### 4.6 Проверка CAPTCHA

В EmailJS dashboard убедиться, что у шаблона включена reCAPTCHA V2. Без токена `g-recaptcha-response` письмо не должно отправляться.

## 5. Env и конфигурация

### 5.1 `.env.example`

Создать в корне:

```dotenv
# EmailJS public configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=public_xxxxxxxxxxxx

# Google reCAPTCHA v2 public site key
VITE_RECAPTCHA_SITE_KEY=6Lc_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`VITE_SERVER_URL` в `.env.example` не добавлять: после миграции он не используется.

### 5.2 `.env`

Локально скопировать `.env.example` в `.env` и заполнить реальными значениями. `.env` уже в `.gitignore`. Добавить в `.gitignore` защиту остальных env-файлов:

```gitignore
.env
.env.*
!.env.example
*.local
```

### 5.3 Типизация env

Обновить `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  grecaptcha?: {
    getResponse(): string;
    reset(): void;
  };
}
```

### 5.4 Зависимости

```bash
pnpm add @emailjs/browser
pnpm remove axios @types/axios
```

Если Vitest ещё не настроен:

```bash
pnpm add -D vitest@^2 jsdom
```

## 6. Изменения по файлам

### 6.1 Новый `src/api/emailjs.ts`

```ts
import emailjs from '@emailjs/browser';

export type BookingNotification = {
    tourTitle: string;
    phone: string;
    message: string;
    language: string;
    pageUrl?: string;
    recaptchaToken: string;
};

type EmailJsConfig = {
    serviceId: string;
    templateId: string;
    publicKey: string;
};

const readConfig = (): EmailJsConfig => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
    }

    return { serviceId, templateId, publicKey };
};

export const buildBookingParams = (data: BookingNotification) => ({
    tour_title: data.tourTitle.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
    language: data.language,
    page_url: data.pageUrl || window.location.href,
    submitted_at: new Date().toISOString(),
    'g-recaptcha-response': data.recaptchaToken,
});

export const sendBookingNotification = async (data: BookingNotification) => {
    const { serviceId, templateId, publicKey } = readConfig();

    const response = await emailjs.send(
        serviceId,
        templateId,
        buildBookingParams(data),
        { publicKey },
    );

    if (response.status !== 200) {
        throw new Error(`EmailJS responded with status ${response.status}`);
    }

    return response;
};
```

Требования:

- не логировать `data` и env-значения;
- при отсутствии конфигурации выбрасывать ошибку без вывода секретов;
- `pageUrl` можно передавать явно для тестов; fallback — `window.location.href`;
- EmailJS public key не является секретом, но не должен попадать в логи;
- пример выше использует API `@emailjs/browser` v4 (четвёртый аргумент — `{ publicKey }`). Если установится v3, четвёртый аргумент — строка public key; зафиксировать версию в `package.json`.

### 6.2 `src/components/contact-form/contact-form.tsx`

Изменить:

- `const { t } = useTranslation()` → `const { t, i18n } = useTranslation()`;
- удалить `CONTACT_FORM_SEND_URL`;
- добавить `isSending`, `validationError` и `honeypot`;
- заменить `fetch` на `sendBookingNotification`;
- использовать i18n-сообщение для бронирования;
- показывать ошибку валидации;
- блокировать повторную отправку;
- добавить проверку honeypot;
- добавить проверку reCAPTCHA и сброс виджета при ошибке;
- добавить кнопку «Попробовать снова» в состоянии ошибки.

Ключевой фрагмент:

```ts
const [isSending, setIsSending] = useState(false);
const [validationError, setValidationError] = useState<string | null>(null);
const [honeypot, setHoneypot] = useState('');

const onBtnClickHandler = async () => {
    if (isSending) return;

    // Honeypot: люди это поле не видят, боты часто заполняют
    if (honeypot.trim()) return;

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) {
        setValidationError(t('contact-form.phone-required'));
        return;
    }

    const recaptchaToken = window.grecaptcha?.getResponse();
    if (!recaptchaToken) {
        setValidationError(t('contact-form.captcha-required'));
        return;
    }

    setValidationError(null);
    setIsSending(true);

    try {
        await sendBookingNotification({
            tourTitle: props.tourTitle,
            phone,
            message: t('contact-form.booking-message', { tour: props.tourTitle }),
            language: i18n.language,
            pageUrl: window.location.href,
            recaptchaToken,
        });
        dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.delivered));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        console.error('EmailJS booking notification failed', message);
        window.grecaptcha?.reset();
        dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.error));
    } finally {
        setIsSending(false);
    }
};
```

UI:

```tsx
<input
    type="text"
    name="company"
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
    className="contact-form-honeypot"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
/>

{validationError && (
    <div className="contact-form-network-error-text" role="alert">
        {validationError}
    </div>
)}

<div
    className="g-recaptcha"
    data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
/>

<ButtonOne
    text={isSending
        ? t('contact-form.send-btn-text-loading')
        : t('contact-form.send-btn-text')}
    onClick={onBtnClickHandler}
    disabled={isSending}
/>
```

В блоке ошибки добавить:

```tsx
<ButtonOne
    text={t('contact-form.try-again')}
    onClick={() => dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.notSent))}
/>
```

Не логировать телефон, сообщение или env-значения. В `console.error` допустимо передавать только статус/текст ошибки без payload.

### 6.2.1 `index.html`

Добавить скрипт reCAPTCHA v2:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

Скрипт должен загрузиться до того, как пользователь нажмёт «Отправить». Если `window.grecaptcha` ещё нет, форма покажет `captcha-required`; повторная попытка после загрузки скрипта сработает.

### 6.2.2 `src/components/contact-form/contact-form.scss`

```scss
.contact-form-honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
}
```

Не использовать `display: none`: некоторые боты такие поля пропускают. Поле должно быть скрыто визуально, но присутствовать в DOM.

### 6.3 `src/components/buttons/buttonContact.tsx`

Сбрасывать статус при открытии формы, иначе после успешной отправки повторное открытие показывает старый экран успеха:

```ts
import { bookTourSendStatusEnum } from '../../store/consts';
import { setBookTourSendStatusAC, setIsBookTourShow } from '../../store/appSlice';

const showBookTour = () => {
    dispatch(setBookTourSendStatusAC(bookTourSendStatusEnum.notSent));
    dispatch(setIsBookTourShow(true));
};
```

### 6.4 `src/components/buttons/button1.tsx`

Добавить необязательный `disabled`:

```ts
type ButtonPropsType = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
};

<button
    className="button-one-class"
    onClick={() => props.onClick()}
    disabled={props.disabled}
>
    {props.text}
</button>
```

### 6.5 i18n

Добавить ключи в `src/i18/lang-en.json`, `lang-es.json`, `lang-ru.json` в объект `contact-form`:

```json
"booking-message": "I want to book the tour {{tour}}",
"phone-required": "Please enter a valid phone number.",
"captcha-required": "Please confirm that you are not a robot.",
"send-btn-text-loading": "Sending...",
"try-again": "Try again"
```

Испанский:

```json
"booking-message": "Quiero reservar el tour {{tour}}",
"phone-required": "Por favor, introduzca un número de teléfono válido.",
"captcha-required": "Por favor, confirme que no es un robot.",
"send-btn-text-loading": "Enviando...",
"try-again": "Intentar de nuevo"
```

Русский:

```json
"booking-message": "Хочу забронировать тур {{tour}}",
"phone-required": "Пожалуйста, укажите корректный номер телефона.",
"captcha-required": "Пожалуйста, подтвердите, что вы не робот.",
"send-btn-text-loading": "Отправка...",
"try-again": "Попробовать снова"
```

Проверить, что i18next интерполирует `{{tour}}`, а не оставляет плейсхолдер.

### 6.6 Удаление backend- и Telegram-легаси

Удалить мёртвый backend-код и форму обратной связи:

- `src/widgets/contact-form-feedback/contact-form-feedback.tsx`;
- `src/widgets/contact-form-feedback/contact-form-classes.scss`;
- `src/api/api.ts`;
- закомментированные импорт/JSX `ContactFeedbackForm` в `src/shared/main-wrapper/main-wrapper.tsx`.

Удалить Telegram-легаси:

- `src/store/consts.ts`: удалить `telegram: 'costaricatures'` из `CONTACTS`;
- `src/widgets/contacts/contacts-2.tsx`: удалить Telegram-ссылку, `CONTACTS.telegram` и `{t('contacts.or')}`; оставить только WhatsApp;
- `src/widgets/contacts/constact-classes.scss`: удалить `.contacts-page-wrapper-2-telegram` и `@keyframes tg_keyframes`;
- `src/i18/lang-en.json`, `lang-es.json`, `lang-ru.json`: удалить ключ `contacts.or` (он использовался только как разделитель перед Telegram); `contacts.or_use_phone` оставить;
- удалить/отключить Telegram-бота и его токены на backend/hosting; email-to-Telegram мост не настраивать.

После удаления проверить:

```bash
grep -rniE "telegram|t\.me|tg_keyframes|contacts\.or([^_[:alnum:]]|$)|VITE_SERVER_URL|axios|feedbackAPI|ContactFeedbackForm|contact_form" src
```

Ожидаемый результат: пусто. `contact-whatsapp-text`, WhatsApp-ссылка и `contacts.or_use_phone` должны остаться.

### 6.7 `AGENTS.md`

Обновить:

- **Environment:** `.env.example` существует; локальный `.env`; переменные `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_RECAPTCHA_SITE_KEY`; `VITE_*` публичны; `VITE_SERVER_URL` и `VITE_WEB_SITE_URL` удалены.
- **Architecture:** уведомления отправляются через `src/api/emailjs.ts`; backend-URL для форм больше нет.
- **Testing:** добавить `pnpm test` и путь к тестам EmailJS.
- **Gotchas:** EmailJS public key не секрет; ограничить origins; шаблон и переменные должны совпадать; Telegram не используется ни для уведомлений, ни как контактный канал; `ContactFeedbackForm` удалена.
- Удалить абзац про несоответствие backend-использования `VITE_SERVER_URL` и любые упоминания Telegram как рабочего канала.

## 7. Защита от дублей, спама и UX

### 7.1 Двойное нажатие

- `isSending` блокирует повторный вход в обработчик.
- Кнопка получает `disabled={isSending}`.
- В `finally` флаг сбрасывается.
- Ручная проверка: два быстрых клика → одно письмо.

### 7.2 Honeypot

- Добавить скрытое поле `company` (см. 6.2 и 6.2.2).
- Если `honeypot.trim()` не пустой — не отправлять письмо и не менять UI.
- Поле должно быть скрыто визуально, но присутствовать в DOM.
- Honeypot — только базовый барьер; умные боты его обходят.

### 7.3 reCAPTCHA v2

EmailJS поддерживает только reCAPTCHA v2 (checkbox), не v3.

- Зарегистрировать сайт в Google reCAPTCHA (см. 4.5).
- Site Key добавить в `.env` как `VITE_RECAPTCHA_SITE_KEY`.
- Secret Key добавить только в EmailJS template settings.
- Подключить скрипт `https://www.google.com/recaptcha/api.js` в `index.html`.
- Отрисовать виджет в форме:
  ```tsx
  <div
      className="g-recaptcha"
      data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
  />
  ```
- Перед отправкой получить токен:
  ```ts
  const recaptchaToken = window.grecaptcha?.getResponse();
  if (!recaptchaToken) {
      setValidationError(t('contact-form.captcha-required'));
      return;
  }
  ```
- Передать токен в `sendBookingNotification`; `buildBookingParams` кладёт его в `'g-recaptcha-response'`.
- При ошибке отправки вызвать `window.grecaptcha?.reset()`, чтобы пользователь мог попробовать снова.
- Если скрипт Google заблокирован/не загрузился, форма не отправится; пользователь может использовать телефон/WhatsApp.
- Google reCAPTCHA — третья сторона; обновить privacy policy при необходимости.
- Если CSP появится, разрешить домены `https://www.google.com/recaptcha/`, `https://www.gstatic.com/recaptcha/` для script/frame/connect.

### 7.4 UX и ошибки

- Пустой/слишком короткий телефон показывает `phone-required` и не отправляет запрос.
- Непройденная CAPTCHA показывает `captcha-required`.
- Успех: текущий экран `delivered` с существующим текстом.
- Ошибка EmailJS/сети/конфига: текущий экран `error` + кнопка «Попробовать снова».
- При повторном открытии модалки статус сбрасывается в `notSent`.
- В блоке ошибки остаётся возможность позвонить/написать в WhatsApp.
- Не показывать пользователю технические детали EmailJS.
- Не логировать PII.

Опционально: таймаут 15–20 секунд через `Promise.race`, чтобы кнопка не зависла навсегда. Если добавлять — покрыть тестом с fake timers.

## 8. Безопасность и приватность

- `VITE_*` попадают в клиентский бандл. `VITE_EMAILJS_PUBLIC_KEY` — публичный идентификатор, не секрет.
- Private key/серверные токены EmailJS нельзя добавлять во фронтенд.
- Ограничить домены в EmailJS (**Account → Security → Domains**); не полагаться только на public key.
- Включить reCAPTCHA v2 в EmailJS template settings и использовать honeypot-поле; это два независимых барьера.
- Client-side honeypot обходим; EmailJS reCAPTCHA и лимиты — основная защита.
- Не использовать `{{{variable}}}` и raw HTML в шаблоне; ограничивать длину `tour_title`/`phone`/`message`.
- Не логировать name/email/phone/message/env/recaptcha token.
- Уведомление содержит PII (телефон, текст заявки). Проверить privacy policy и, при необходимости, добавить упоминание EmailJS и Google reCAPTCHA как обработчиков и сроки хранения.
- CSP: если появится, добавить `https://api.emailjs.com` в `connect-src`, а для reCAPTCHA — `https://www.google.com/recaptcha/` и `https://www.gstatic.com/recaptcha/` в `script-src`, `frame-src` и `connect-src`.
- `.env` не коммитить; `.env.example` содержит только плейсхолдеры.
- EmailJS и email-провайдер — третьи стороны; проверить их политику и лимиты.
- Остаточный риск: публичный ключ можно использовать с разрешённого origin для спама; EmailJS rate limits/reCAPTCHA снижают, но не устраняют риск.

## 9. Тестирование

### 9.1 Unit-тесты сервиса

Если Vitest уже настроен языковым планом — переиспользовать. Иначе добавить `vitest@^2`, `jsdom` и:

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

`src/api/emailjs.test.ts`:

```ts
import emailjs from '@emailjs/browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildBookingParams, sendBookingNotification } from './emailjs';

vi.mock('@emailjs/browser', () => ({
    default: { send: vi.fn() },
}));

const sendMock = vi.mocked(emailjs.send);

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public');
});

afterEach(() => {
    vi.unstubAllEnvs();
});

describe('EmailJS booking notification', () => {
    it('builds normalized params', () => {
        const params = buildBookingParams({
            tourTitle: ' Tour ',
            phone: ' +506 8912 2090 ',
            message: ' Hello ',
            language: 'ru',
            pageUrl: 'https://example.com/tour-info/1',
            recaptchaToken: 'test-token',
        });

        expect(params.tour_title).toBe('Tour');
        expect(params.phone).toBe('+506 8912 2090');
        expect(params.message).toBe('Hello');
        expect(params.language).toBe('ru');
        expect(params.page_url).toBe('https://example.com/tour-info/1');
        expect(params.submitted_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
        expect(params['g-recaptcha-response']).toBe('test-token');
    });

    it('sends with configured ids and public key', async () => {
        sendMock.mockResolvedValue({ status: 200, text: 'OK' });

        await sendBookingNotification({
            tourTitle: 'Tour',
            phone: '+50689122090',
            message: 'Hello',
            language: 'es',
            pageUrl: 'https://example.com/tour-info/1',
            recaptchaToken: 'token',
        });

        expect(sendMock).toHaveBeenCalledWith(
            'service',
            'template',
            expect.objectContaining({
                tour_title: 'Tour',
                phone: '+50689122090',
                language: 'es',
                'g-recaptcha-response': 'token',
            }),
            { publicKey: 'public' },
        );
    });

    it('throws if config is missing', async () => {
        vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '');

        await expect(sendBookingNotification({
            tourTitle: 'Tour',
            phone: '+50689122090',
            message: 'Hello',
            language: 'es',
            recaptchaToken: 'token',
        })).rejects.toThrow('EmailJS configuration is missing');
    });

    it('throws on non-200 response', async () => {
        sendMock.mockResolvedValue({ status: 422, text: 'Bad template' });

        await expect(sendBookingNotification({
            tourTitle: 'Tour',
            phone: '+50689122090',
            message: 'Hello',
            language: 'es',
            recaptchaToken: 'token',
        })).rejects.toThrow('EmailJS responded with status 422');
    });
});
```

Если `vi.stubEnv` не подхватывает `import.meta.env` в текущей версии Vitest, вынести чтение конфигурации в функцию с явным параметром или тестировать `readConfig` через `vi.resetModules()` + динамический импорт. Решение зафиксировать в тестах.

### 9.2 Ручная проверка

1. Заполнить `.env` реальными EmailJS-значениями и `VITE_RECAPTCHA_SITE_KEY`.
2. `pnpm dev`.
3. Открыть тур, нажать «Забронировать тур», ввести телефон, отправить без CAPTCHA — показать `captcha-required`, письмо не отправлять.
4. Пройти CAPTCHA и отправить. Проверить:
   - письмо пришло на `CONTACTS.email`;
   - тема и переменные корректны;
   - в письме правильные тур, телефон, язык, URL;
   - UI показал успех.
5. Повторно открыть модалку — форма снова в состоянии `notSent`, CAPTCHA сброшена.
6. Отправить дважды быстро — должно уйти одно письмо.
7. Очистить телефон — показать ошибку, письмо не отправлять.
8. В DevTools заполнить скрытое поле `company` и отправить — письмо не должно уйти (honeypot).
9. Подставить неверный `VITE_EMAILJS_TEMPLATE_ID` — UI показывает ошибку, приложение не падает, CAPTCHA сбрасывается.
10. Отключить сеть — UI показывает ошибку.
11. Проверить на en/es/ru, что `booking-message` переведён и `language` правильный.
12. Проверить production origin в EmailJS Dashboard → Account → Security → Domains и домены в Google reCAPTCHA Admin.
13. Проверить, что в консоли нет PII и env-значений.

### 9.3 Команды

```bash
pnpm install
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm build
```

## 10. Деплой и миграция

1. Настроить EmailJS-шаблон, Allowed origins и домены Google reCAPTCHA.
2. Добавить `VITE_EMAILJS_*` и `VITE_RECAPTCHA_SITE_KEY` в env хостинга/CI. Vite встраивает их на этапе build.
3. Задеплоить на preview/staging, отправить тестовую заявку.
4. Задеплоить production, отправить тестовую заявку с production-домена.
5. Убедиться, что письмо приходит и не попадает в спам.
6. Только после успешной проверки удалить `VITE_SERVER_URL` и `VITE_WEB_SITE_URL` из env хостинга и backend-инфраструктуры, отключить/удалить Telegram-бота и его секреты.
7. Удалить старый backend-код из репозитория (в рамках этого же PR/коммита) и обновить `AGENTS.md`.
8. Проверить, что в production-бандле и интерфейсе не осталось Telegram-ссылок, `CONTACTS.telegram`, `contacts.or` и CSS/keyframes Telegram.

Если EmailJS-аккаунт или шаблон ещё не готовы, код можно задеплоить с ошибкой конфигурации: форма покажет ошибку, но приложение не упадёт. Не включать production-трафик до проверки.

## 11. Откат

- Откатить коммит с миграцией и задеплоить предыдущую версию.
- Вернуть `VITE_SERVER_URL` и `VITE_WEB_SITE_URL` в env и backend, если они ещё существуют.
- Если Telegram-бот уже отключён/удалён, для полноценного отката его нужно восстановить; иначе форма будет отправлять в backend без Telegram-уведомлений.
- EmailJS-шаблон можно оставить или отключить в dashboard.
- Данные не мигрируются: старые заявки остаются в истории Telegram/почты/логов backend.
- После отката проверить, что форма снова отправляет через backend и статус `277` работает.

## 12. Критерии готовности

- Активная форма бронирования отправляет уведомление через EmailJS.
- Письмо приходит на `CONTACTS.email` и содержит все переменные.
- Успех/ошибка/валидация/повторная отправка работают.
- Двойное нажатие не создаёт второе письмо.
- Honeypot блокирует отправку при заполненном поле `company`.
- reCAPTCHA v2 включена в EmailJS и проверяется перед отправкой; без токена письмо не уходит.
- При ошибке CAPTCHA сбрасывается.
- При повторном открытии модалки статус сбрасывается.
- `VITE_SERVER_URL`, `axios`, `feedbackAPI`, `ContactFeedbackForm` и `src/api/api.ts` удалены.
- Удалены `CONTACTS.telegram`, Telegram-ссылка в контактах, CSS/keyframes Telegram и i18n-ключ `contacts.or`.
- В `src` не осталось упоминаний `telegram`, `t.me`, `tg_keyframes`, `contacts.or` как отдельного ключа/вызова, `VITE_SERVER_URL`, `axios`, `feedbackAPI`, `ContactFeedbackForm`.
- `.env.example` содержит только актуальные переменные, включая `VITE_RECAPTCHA_SITE_KEY`; `.env` не коммитится.
- `AGENTS.md` обновлён.
- `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` проходят.
- Проверены en/es/ru, production origin и домены reCAPTCHA.
- В логах нет PII/env-значений/recaptcha token.
- Telegram-бот и его секреты выведены из эксплуатации; email-to-Telegram мост не настроен.

## 13. Риски

- **Смена привычного канала** — менеджеры привыкли к Telegram; нужно заранее сообщить о переходе на email и проверить, что письма не попадают в спам.
- **Лимиты EmailJS** — при исчерпании квоты отправка падает; нужен мониторинг и fallback на телефон/WhatsApp.
- **Спам/доставляемость** — письмо может попасть в спам; проверить отправителя, SPF/DKIM на стороне EmailJS, добавить в белый список.
- **Публичный ключ** — может быть использован с разрешённого origin; ограничить origins/rate limits/reCAPTCHA.
- **PII** — телефон и текст заявки уходят третьей стороне; обновить privacy policy при необходимости.
- **Несовпадение переменных шаблона** — поля будут пустыми; тестировать шаблон и код вместе.
- **reCAPTCHA недоступна** — Google может быть заблокирован/недоступен; форма не отправится, нужен fallback на телефон/WhatsApp.
- **Домены reCAPTCHA** — localhost/preview/production должны быть добавлены в Google reCAPTCHA Admin; иначе виджет не пройдёт проверку.
- **Allowed domains** — забытый production/preview origin блокирует отправку. Настраивается в EmailJS Dashboard → Account → Security → Domains.
- **Env на build-time** — Vite встраивает значения при сборке; изменение env требует пересборки.
- **Мёртвый код** — если продукт позже захочет форму обратной связи, понадобится отдельная задача с i18n-ключами и, возможно, отдельным EmailJS-шаблоном.
- **Telegram-легаси** — ссылка, ключи i18n и CSS могут остаться незамеченными; проверка `grep` в критериях обязательна.

## 14. Вне рамок

- Telegram-интеграции не реализуются и не возвращаются; при необходимости это отдельная задача.
- Автоответ пользователю на email.
- CRM, аналитика заявок и хранение лидов.
- Восстановление формы обратной связи, если продукт её потребует.
- Изменение дизайна формы, кроме необходимых состояний загрузки/ошибки/валидации.
- Автоопределение языка — отдельный план `plans/language/lang-plan.md`.

## 15. Открытые вопросы перед реализацией

1. Подтвердить, что уведомления должны приходить именно на `oldagatour@gmail.com`, а не на другой адрес/группу.
2. Подтвердить, нужен ли автоответ пользователю (в текущем функционале его нет).
3. Проверить тариф EmailJS и лимиты отправки.
4. Уточнить, требуется ли юридическое согласие/обновление privacy policy для передачи телефона и текста заявки в EmailJS и Google reCAPTCHA.
5. Подтвердить, что reCAPTCHA v2 (checkbox) подходит по UX; v3 EmailJS не поддерживает.
