# Website Set-up

1. Maak een folder aan op de VPS:
```bash
mkdir /var/www/<project_naam>
cd /var/www/<project_naam>
``` 

2. Haal de nieuwste versie op van Github:
```bash
git clone <repo_url>
```

3. Activeer de Python virtual environment
```bash
source venv/bin/activate
```

4. Installeer dependencies:
```bash
pip install -r requirements.txt
```

5. Download JavaScript packages:
```bash
npm install
```

6. Compileer de Frontend:
```bash
npm run build # Command gemaakt in de package.json
```

7. Maak de `.env` aan en vul hem in
```bash
nano .env
```

8. Vul in Gunicorn/Systemd de Environment variables in
```bash
nano /etc/systemd/system/gunicorn.service
```

9. Activeer ens tart gunciorn
```bash
systemctl daemon-reload
systemctl enable gunicorn
systemctl restart gunicorn
```

10. Configureer Nginx:
```bash
nano /etc/nginx/sites-available/<project_naam>
```

11. Activeer en test Nginx
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

12. Maak eventueel de `database` en een `user` aan

13. Voer Django migrations uit
```bash
python manage.py migrate
```

14. Seed de database:
```bash
python manage.py seed
```

15. Zorg dat de frontend werkt van Django
```bash
python manage.py collectstatic --noinput
```

---

# Website Updaten

1. Pull de laatse code
```bash
cd /var/www/<project_naam>
git pull
```

2. python manage.py collectstatic --noinput
```bash
source venv/bin/activate
```

3. Installeer nieuwe Python dependencies (indien nodig)
```bash
pip install -r requirements.txt
```

4. Installeer nieuwe Node.js packages (indien frontend updates)
```bash
npm install
```

5. Rebuild frontend
```bash
npm run build
```

6. Voer migrations uit (indien database updates)
```bash
python manage.py migrate
```

7. Update static files
```bash
python manage.py collectstatic --noinput
```

8. Herstart Gunicorn
```bash
systemctl restart gunicorn
```

9. Herstart Nginx (indien config gewijzigd)
```bash
systemctl restart nginx
```

---

# Database aanmaken

1. Log in bij MariaDB (MySQL):
```
sudo mariadb
```

2. Maak een gebruiker aan:
```sql
CREATE USER 'proto_user'@'localhost' IDENTIFIED BY 'porto_password';
```

3. Maak de database aan:
```sql
CREATE DATABASE porto_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

4. Geef rechten van aangemaakte database aan de aangemaakte gebruiker
```sql
GRANT ALL PRIVILEGES ON porto_db.* TO 'porto_user'@'localhost';
FLUSH PRIVILEGES; # Verversen
```

5. Controleer of je kan inloggen met de aangemaakte gebruiker:
```bash
mysql -u porto_user -p -h localhost porto_db
```

---

# BUGS


* Zorg dat `npm` gedownload is
```bash
sudo apt install -y nodejs npm
```


* Zorg dat `pip` geupdated is:
```bash
pip update
```


* Zorg dat gunicorn geinstalleerd is:
```bash
pip install gunicorn
```


* Zorg dat Mariadb (MySQL) geinstalleerd is voor Debian/Ubuntu:
```bash
sudo apt install -y python3-dev default-libmysqlclient-dev build-essential pkg-config
```