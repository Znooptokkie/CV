# Wishlist

    - Aparte .env voor development (.env.dev) EN productie (.env.prod)
    - Cors header voor API endpoints
    - Unit tests

## Optioneel Wishlist

    - Shell script -> CI/CD
    - Database back-up
    - Logging

---

# Migrations

## Aanmaken

Maak nieuw migratiebestand aan
```bash
python manage.py makemigrations core --name next_migration # Optional --empty for empty migration
```

Pas migrations toe
```bash
python manage.py migrate
```

## Rollback

Rollback naar specifieke migration
```bash
python manage.py migrate core 0001_init_build
```
---

Volledige rollback van app
```bash
python manage.py migrate core zero
```

Daarna opnieuw migreren
```bash
python manage.py migrate core
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

---

# CI Pipeline

## Flow

1. Maak een nieuwe ``feature/`` branch aan
```bash
git checkout -b feature/*
```

2. Zorg dat de code clean is met ``ruff``
```bash
ruff check . --fix # --fix is voor local
```

3. Push naar Github
```bash
git add .
git commit -m "Github Commit"
git push -u origin feature/*
```

4. Rebase van `develop` branch
```bash
git fetch origin
git rebase origin/develop
# Bij conflicts oplossen, daarna:
git rebase --continue
# Force push na rebase
git push --force-with-lease
```

5. Maak een Pull Request aan van ``feature/*`` naar ``develop``

6. Maak een Pull Request aan van ``develop`` naar ``master``

7. Checkout naar ``master``
```bash
git checkout master
```

8. Delete de ``feature/*`` branch ``local`` en ``remote``
```bash
git branch -d feature/* # local
git push origin --delete feature/* # remote
```

9. Pull code voor ``master`` branch
```bash
git pull
```

## Code geschreven op master branch

1. Switch naar een nieuwe branch vanuit huidige punt
```bash
git switch -x feature/*
```

2. Ga terug naar `master` branch en reset hem
```bash
git switch master
git reset --hard origin/master
```

3. Ga terug naar `feature/*` branch
```bash
git switch feature/*
```

4. Push de branch naar Github
```bash
git push -u origin/feature/*
```

---

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
