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

1. Maak een nieuwe ``feature`` branch aan vanaf ``develop``
```bash
git checkout develop
git pull
git checkout -b feature/<naam>
```

2. Ontwikkel je feature en check code clean
```bash
ruff check . --fix
git add .
git commit -m "Omschrijving van feature"
```

3. Push feature branch naar GitHub
```bash
git push -u origin feature/<naam>
```

4. Werk feature branch bij met de laatste develop
```bash
git fetch origin
git merge origin/develop
# Of optioneel: git rebase origin/develop
# Conflicten oplossen in de feature branch
git add <conflict-bestanden>
git commit
git push
```

5. Open een Pull Request van feature/<naam> → develop
```bash
# Wacht tot review + CI groen is
# Merge via PR naar develop
```

6. Open een Pull Request van develop → master
```bash
# Wacht tot review + CI groen is
# Merge via PR naar develop
```

7. Feature branch verwijderen na merge
```bash
git branch -d feature/<naam>        # lokaal
git push origin --delete feature/<naam>  # remote
```

8. Master updaten lokaal na merge
```bash
git checkout master
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




--- TEST ---