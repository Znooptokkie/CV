# Wishlist

    - Aparte .env voor development (.env.dev) EN productie (.env.prod)
    - CI/CD Pipeline
    - Cors header voor API endpoints
    - Unit tests

## Optioneel Wishlist

    - Shell script -> CI/CD
    - Database back-up
    - Logging

# Migrations

Maak migratie aan
```bash
python manage.py makemigration
```

Migrate daadwerkelijk
```bash
python manage.py migrate
```

# Static scripts

Compile TS eenmalig
```bash
npm run build:ts
```

Development watch mode
```bash
npm run watch:ts
```

SASS watch
```bash
npm run watch:sass
```

Watch alles
```bash
npm run watch:dev
```

# Productie

1. Static file hashing / cahche-busting
```py
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
```

2. Security headers & best practice
```py
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
CSRF_COOKIE_SECURE = True # Voor HTTPS
```

3. Zet correcte .env bestand