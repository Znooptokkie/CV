# VPS


1. Maak een folder aan:
```bash
mkdir /var/www/<project_naam>
```


2. Maak een Virtual Enviroment en activeer hem:
```bash
python3 -m venv <project_naam>_venv
source venv/bin/activate
```


3. Clone het project in deze folder:
```bash
git clone https://github.com/Znooptokkie/CV .
```


4. Installeer de Django dependencies:
```bash
pip install -r requirements.txt
```


5. Download Frontend dependencies:
```bash
npm install
```


6. Compileer de static code:
```bash
npm run build # Komt uit de package.json
```


7. Verzamel alle static bestanden voor Nginx:
```bash
python manage.py collectstatic --noinput
```


8. Migrate de database schemas
```bash
python manage.py migrate
```

8. Seed de database


9. Gunicorn configureren:
```bash
sudo nano /etc/systemd/system/<project_naam>.service
```


10. Reload en start services:
```bash
sudo systemctl daemon-reload
sudo systemctl enable <project_naam>
sudo systemctl start <project_naam>
sudo systemctl status <project_naam>
```


11. Nginx configureren:
```bash
sudo nano /etc/nginx/sites-available/<project_naam>
```


12. Nginx herladen:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

13. Verander in `manage.py`, `config/wsgi.py` & `config/wsgi.py` de omgeving naar `prod`
```py
'config.settings.dev' # Development

'config.settings.prod' # Productie
```


## Settings instellen voor Productie




## Gunicorn


## Nginx


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

## Database aanmaken

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

pi install gunicorn