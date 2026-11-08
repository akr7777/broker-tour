# DEPLOYMENT.md

Развёртывание сайта `https://costaricatures.com/` после миграции на Vike (SSG).

## 1. Схема

- Сборка: Vike пререндерит все страницы в `dist/client/`.
- Production: только статические файлы + nginx.
- Node.js на production-сервере не нужен, если сборка выполняется локально или в CI.
- Основной домен: `https://costaricatures.com/`.
- Без `www`.
- `turescostarica.com` и `www.*` — 301 на основной домен.
- Языковые версии: `/`, `/es/`, `/en/`.


## 1.1 Вариант: сторонний статический хостинг

Если сайт размещается не на своём nginx, а на стороннем хостинге, схема остаётся статической: собираете проект локально/в CI и загружаете **всё содержимое** `dist/client/` в корень сайта.

> Сейчас, до миграции на Vike, `pnpm build` — это обычный Vite SPA и он создаёт `dist/`, а не `dist/client/`. Описанная ниже схема относится к состоянию **после** миграции на Vike.

Что загружать:

- все HTML-файлы и директории (`index.html`, `about/index.html`, `es/`, `en/`, `tour-info/...`);
- `assets/`;
- `*.pageContext.json` — без них ломается клиентская навигация Vike;
- `robots.txt`, `sitemap.xml`, `llms.txt`;
- `404.html`;
- `logo.png`, `og/`, `team/` и остальные файлы из `public/`.

Не загружать:

- `dist/server/` — для полного SSG он не нужен;
- `node_modules/`;
- `.env` — переменные уже встроены в бандл на этапе сборки.

Что должен уметь хостинг:

- отдавать `index.html` для директорий (`/about/` → `/about/index.html`);
- отдавать `404.html` для неизвестных URL;
- **не** включать SPA-fallback вида «все пути → `/index.html`», иначе `/es/`, `/en/` и несуществующие туры будут отдавать неверную страницу;
- поддерживать HTTPS и основной домен без `www`;
- по возможности делать 301 с `/about` на `/about/`, `/es` на `/es/` и т.п.

Если хостинг собирает проект из Git, укажите:

- build command: `pnpm build`;
- publish/output directory: `dist/client`;
- Node.js 20+;
- build-time env: `VITE_SERVER_URL`, `VITE_WEB_SITE_URL`.

Если сайт будет не в корне домена, а в подпапке (`example.com/site/`), недостаточно просто скопировать файлы: нужно настроить `base` в Vite/Vike и пересобрать проект.

Примеры:

- **Netlify:** build `pnpm build`, publish `dist/client`; не добавлять SPA-redirect на `/index.html`.
- **Vercel:** output directory `dist/client`, статический проект.
- **Cloudflare Pages:** build output `dist/client`.
- **Apache/ shared hosting:** загрузить содержимое `dist/client` в `public_html`; включить `DirectoryIndex index.html`, `ErrorDocument 404 /404.html`; при возможности настроить 301 на trailing slash.
- **GitHub Pages:** загрузить содержимое `dist/client`, добавить `.nojekyll`, настроить `404.html`; серверных 301 может не быть, поэтому ссылки должны сразу вести на URL со слэшем.

Главное: `dist/client` — это не только HTML. Если загрузить только `index.html` и `assets/`, страницы `/about/`, `/es/`, `/en/` и клиентская навигация работать не будут.

## 2. Требования

- Node.js 20+ для сборки (локально проверено на Node 24).
- pnpm.
- nginx.
- TLS-сертификат, покрывающий:
  - `costaricatures.com`;
  - `www.costaricatures.com`;
  - `turescostarica.com`;
  - `www.turescostarica.com`.

Если сертификат не покрывает все имена, используйте отдельные `server`-блоки и отдельные сертификаты.

## 3. Переменные окружения

Создать `.env` в корне проекта (не коммитить):

```dotenv
VITE_SERVER_URL=https://<backend>
VITE_WEB_SITE_URL=https://costaricatures.com
```

Важно:

- переменные встраиваются в бандл на этапе сборки;
- для production собирать с production-значениями;
- секреты в репозиторий не добавлять;
- после изменения `.env` нужна пересборка.

## 4. Сборка

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm build
```

Ожидаемый результат:

```text
dist/client/
  index.html
  faq/index.html
  about/index.html
  tour-info/1/index.html
  ...
  es/index.html
  es/faq/index.html
  es/about/index.html
  en/tour-info/1/index.html
  en/about/index.html
  assets/
  robots.txt
  sitemap.xml
  llms.txt
  404.html
  logo.png
  og/cover.jpg
  team/olga.jpg
  team/david.jpg
```

Vike также создаёт `*.pageContext.json` рядом с HTML — они нужны для клиентской навигации. Деплоить нужно весь `dist/client`, а не только HTML.

`dist/server/` для полностью пререндеренного сайта не деплоится.

Локальная проверка production-сборки:

```bash
pnpm exec vike preview
```

## 5. Структура на сервере

```text
/var/www/costaricatures.com/
  releases/
    2026-11-04-120000/
      dist/
        client/
          index.html
          es/
          en/
          ...
    2026-11-05-090000/
      dist/
        client/
          ...
  current -> /var/www/costaricatures.com/releases/2026-11-05-090000
```

Nginx смотрит в:

```text
/var/www/costaricatures.com/current/dist/client
```

Симлинк `current` позволяет делать атомарный rollback.

## 6. Деплой

Пример с локальной машины:

```bash
RELEASE=$(date +%Y%m%d-%H%M%S)
SERVER=user@costaricatures.com
BASE=/var/www/costaricatures.com

ssh "$SERVER" "mkdir -p $BASE/releases/$RELEASE"
rsync -az --delete dist/client/ "$SERVER:$BASE/releases/$RELEASE/dist/client/"
ssh "$SERVER" "ln -sfn $BASE/releases/$RELEASE $BASE/current && nginx -t && systemctl reload nginx"
```

Проверить права:

```bash
ssh "$SERVER" "chown -R www-data:www-data $BASE/releases && chmod -R u=rwX,g=rX,o=rX $BASE/releases"
```

Если сборка выполняется на сервере, установите Node.js 20+ и pnpm, но для стабильности лучше собирать вне production-сервера.

## 7. Nginx

### 7.1 Snippet с security headers

`/etc/nginx/snippets/costaricatures-security.conf`:

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Включать HSTS только после проверки HTTPS на всех доменах.
# add_header Strict-Transport-Security "max-age=31536000" always;
```

### 7.2 Основной конфиг

`/etc/nginx/sites-available/costaricatures.com`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name costaricatures.com www.costaricatures.com turescostarica.com www.turescostarica.com;

    return 301 https://costaricatures.com$request_uri;
}

# Все неосновные HTTPS-имена → основной домен.
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.costaricatures.com turescostarica.com www.turescostarica.com;

    ssl_certificate     /etc/letsencrypt/live/costaricatures.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/costaricatures.com/privkey.pem;

    return 301 https://costaricatures.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name costaricatures.com;

    root /var/www/costaricatures.com/current/dist/client;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/costaricatures.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/costaricatures.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Канонический trailing slash.
    location ~ ^/(?:es|en)$ {
        return 301 https://costaricatures.com$uri/;
    }

    location ~ ^/(?:(?:es|en)/)?(?:about|faq|tour-info/[0-9]+)$ {
        return 301 https://costaricatures.com$uri/;
    }

    location / {
        try_files $uri $uri/ =404;

        include /etc/nginx/snippets/costaricatures-security.conf;
        add_header Cache-Control "no-cache" always;
    }

    # Хэшированные ассеты Vite.
    location ~* \.(?:js|css|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf)$ {
        expires 1y;
        include /etc/nginx/snippets/costaricatures-security.conf;
    }

    location = /robots.txt {
        include /etc/nginx/snippets/costaricatures-security.conf;
        add_header Cache-Control "public, max-age=3600";
    }

    location = /sitemap.xml {
        include /etc/nginx/snippets/costaricatures-security.conf;
        add_header Cache-Control "public, max-age=3600";
    }

    location = /llms.txt {
        include /etc/nginx/snippets/costaricatures-security.conf;
        add_header Cache-Control "public, max-age=3600";
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml;
}
```

> В nginx >= 1.25.1 синтаксис `listen 443 ssl http2` считается устаревшим: используйте `listen 443 ssl;` и отдельную директиву `http2 on;`. Конфиг выше совместим со старыми версиями nginx; при обновлении проверьте `nginx -t`.

Включить сайт:

```bash
ln -s /etc/nginx/sites-available/costaricatures.com /etc/nginx/sites-enabled/costaricatures.com
nginx -t
systemctl reload nginx
```

Не использовать SPA-fallback вида `try_files $uri /index.html`: для пререндеренного сайта неизвестный URL должен отдавать 404, а не русскую главную.

## 8. Проверка после деплоя

### 8.1 Редиректы

```bash
curl -sSI http://costaricatures.com/ | grep -i "^location: https://costaricatures.com/"
curl -sSI https://www.costaricatures.com/ | grep -i "^location: https://costaricatures.com/"
curl -sSI https://turescostarica.com/ | grep -i "^location: https://costaricatures.com/"
```

Ожидается `301`.

### 8.2 Страницы

```bash
curl -sSI https://costaricatures.com/
curl -sSI https://costaricatures.com/es/
curl -sSI https://costaricatures.com/en/tour-info/1/
curl -sSI https://costaricatures.com/about/
curl -sSI https://costaricatures.com/es/about/
curl -sSI https://costaricatures.com/faq/
curl -sSI https://costaricatures.com/tour-info/1/
```

Ожидается `200`.

### 8.3 Trailing slash

```bash
curl -sSI https://costaricatures.com/faq
curl -sSI https://costaricatures.com/about
curl -sSI https://costaricatures.com/es
curl -sSI https://costaricatures.com/tour-info/1
```

Ожидается `301` на вариант со слэшем.

### 8.4 404

```bash
curl -sSI https://costaricatures.com/tour-info/999/
```

Ожидается `404`, не `200` и не редирект на главную.

### 8.5 Контент для роботов

```bash
curl -sS https://costaricatures.com/ | grep -q "<h1"
curl -sS https://costaricatures.com/ | grep -q "Ольга Наймушина"
curl -sS https://costaricatures.com/ | grep -q "application/ld+json"
curl -sS -A "GPTBot" https://costaricatures.com/ | grep -q "<h1"
curl -sS -A "PerplexityBot" https://costaricatures.com/ | grep -q "<h1"
```

### 8.6 Sitemap и robots

```bash
curl -sS https://costaricatures.com/robots.txt
curl -sS https://costaricatures.com/sitemap.xml
curl -sS https://costaricatures.com/llms.txt
```

Проверить, что в `sitemap.xml` есть все 21 URL, а `robots.txt` указывает на `https://costaricatures.com/sitemap.xml`.

## 9. Rollback

Переключить `current` на предыдущий релиз:

```bash
ssh user@costaricatures.com
ls -1 /var/www/costaricatures.com/releases
ln -sfn /var/www/costaricatures.com/releases/<previous> /var/www/costaricatures.com/current
nginx -t
systemctl reload nginx
```

Данные и БД не мигрируются, откат затрагивает только статику и конфиг nginx.

## 10. Troubleshooting

- **404 на `/es/`**: проверьте `dist/client/es/index.html` и `root`.
- **404 на всех страницах**: nginx смотрит не в `dist/client` или симлинк `current` битый.
- **Редирект-петля**: проверьте `server_name` и `return 301`; на основном домене не должно быть редиректа на себя.
- **Старый HTML после деплоя**: проверьте, что для HTML отдаётся `Cache-Control: no-cache`, а не `immutable`.
- **Не грузятся ассеты**: проверьте, что `dist/client/assets/` скопирован и `root` указывает на `dist/client`.
- **Не работает второй домен**: проверьте DNS, сертификат и `server_name`.
- **Не видны страницы в поиске**: проверьте `robots.txt`, sitemap, canonical, `hreflang`, статус 200 и наличие контента без JS.

## 11. Чек-лист релиза

- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm exec vike preview`
- [ ] `dist/client` содержит 21 HTML-страницу
- [ ] nginx-конфиг проверен `nginx -t`
- [ ] 301 с `http`, `www`, `turescostarica.com`
- [ ] trailing slash 301
- [ ] 404 для неизвестного тура
- [ ] H1, JSON-LD, FAQ-ответы есть в `curl`
- [ ] `sitemap.xml`, `robots.txt`, `llms.txt` доступны
- [ ] rollback-релиз сохранён
