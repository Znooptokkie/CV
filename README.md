# Set-up

1. Maak een venv aan:
```bash
python -m venv .venv
```

2. Start de venv:
```bash
source .venv/bin/activate
```

3. Maak de database aan in MySQL:
```sql
CREATE DATABASE porto_db;
```

4. Maak een gebruiker aan in MySQL:
```sql
CREATE USER 'porto_user'@'localhost' IDENTIFIED BY 'JOUW_WACHTWOORD';
```

5. Geef de rechten aan de gebruiker:
```sql
GRANT ALL PRIVILEGES ON porto_db.* TO 'porto_user'@'localhost';
```

6. Herlaad de MySQL omgeving:
```sql
FLUSH PRIVILEGES;
```

7. Zorg dat de juiste variables staan in de .env!

8. Maak nieuw migratiebestand aan
```bash
python manage.py makemigrations core --name next_migration # Optional --empty for empty migration
```

9. Pas migrations toe
```bash
python manage.py migrate
```

10. Seed de database:
```bash
python manage.py seed
```

11. Installeer de frontend:
```bash
npm install
```

12. Watch de volledige frontend (TS & SASS):
```bash
npm run watch:dev
```

---

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

Compile TS & SASS
```bash
npm run build
```

Compile TS eenmalig
```bash
npm run build:ts
```

Compile SASS eenmalig
```bash
npm run build:sass
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

# VPS Updaten
1. Ga naar het project:
```bash
cd /var/www/django_website
```

2. Haal de nieuwe code op:
```bash
git pull origin master
```

3. Compileer SASS & TypeScript:
```bash
npm run build # Command staat in package.json
```

4. Update static files
```bash
python manage.py collectstatic --noinput
```

5. Herstart Gunicorn & Nginx
```bash
systemctl restart gunicorn
systemctl reload nginx
```

## VPS Optioneel

* Activeer de Virtual Environment:
```bash
source django_venv/bin/activate
```

* Installeer dependencies:
```bash
pip install -r requirements.txt
```

* Update static files en verwijder bestaande files:
```bash
python manage.py collectstatic --clear --noinput
```

* Seed de database opnieuw:
> [!WARNING]
> Dit verwijdert de database!
```bash
python manage.py seed
```