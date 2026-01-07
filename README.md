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
```
python manage.py makemigration
```

Migrate daadwerkelijk
```
python manage.py migrate
```
# SASS

Compilen voor productie
```
python manage.py collectstatic --noinput
```

Watchen voor development
```
sass --watch sass/main.scss:static/css/main.css
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