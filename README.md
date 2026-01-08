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

# CI Pipeline

## Flow

1. Maak een nieuwe feature/ branch aan
```bash
git checkout -b feature/*
```

2. Zorg dat de code clean is met ``ruff``
```bash
ruff check . --fix
```

3. Push naar Github
```bash
git add .
git commit -m "Github Commit"
git push -u origin feature/*
```

4. Maak een Pull Request aan van ``feature/*`` naar ``develop``


5. Maak een Pull Request aan van ``develop`` naar ``master``

6. Checkout naar ``master``
```bash
git checkout master
```

7. Delete de ``feature/*`` branch
```bash
git branch -d feature/*
```

8. Pull code voor ``master`` branch
```bash
git pull
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
