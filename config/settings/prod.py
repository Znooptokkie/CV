import os

from config.settings import base

# ==============================
# Basis settings
# ==============================
DEBUG = False
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "atillaoomen.nl").split(",")

# Secrets via environment variables
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", base.SECRET_KEY)

# ==============================
# Database
# ==============================
DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.mysql"),  # of postgres
        "NAME": os.getenv("DB_NAME", base.DATABASES["default"]["NAME"]),
        "USER": os.getenv("DB_USER", base.DATABASES["default"]["USER"]),
        "PASSWORD": os.getenv("DB_PASSWORD", base.DATABASES["default"]["PASSWORD"]),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "3306"),
    }
}

# ==============================
# Installed apps, middleware, templates
# ==============================
INSTALLED_APPS = base.INSTALLED_APPS
MIDDLEWARE = base.MIDDLEWARE
TEMPLATES = base.TEMPLATES
ROOT_URLCONF = base.ROOT_URLCONF

# ==============================
# Static files
# ==============================
STATIC_URL = "/static/"
STATIC_ROOT = os.getenv("DJANGO_STATIC_ROOT", base.BASE_DIR / "staticfiles")
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

# ==============================
# Security
# ==============================
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

# HSTS (optioneel)
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# ==============================
# Email / externe services
# ==============================
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

USE_EXTERNAL_API = True  # Flag voor eigen API calls of queues

# ==============================
# Logging
# ==============================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
        "file": {
            "class": "logging.FileHandler",
            "filename": os.getenv("DJANGO_LOG_FILE", base.BASE_DIR / "logs/django.log"),
        },
    },
    "root": {"handlers": ["console", "file"], "level": "INFO"},
}
