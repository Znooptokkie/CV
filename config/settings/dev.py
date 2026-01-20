import os

from config.settings import base

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

SECRET_KEY = base.SECRET_KEY
INSTALLED_APPS = base.INSTALLED_APPS
MIDDLEWARE = base.MIDDLEWARE
TEMPLATES = base.TEMPLATES
ROOT_URLCONF = base.ROOT_URLCONF
STATIC_URL = "/static/"
STATICFILES_DIRS = [base.BASE_DIR / "static"]

# ==============================
# Database
# ==============================
# GitHub Actions / CI omgeving
if os.getenv("CI"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
    SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "test-secret-key")
    EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
    USE_EXTERNAL_API = False
else:
    # Local development MySQL
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": os.getenv("DB_NAME"),
            "USER": os.getenv("DB_USER"),
            "PASSWORD": os.getenv("DB_PASSWORD"),
            "HOST": os.getenv("DB_HOST", "localhost"),
            "PORT": "3306",
        }
    }

# ==============================
# Logging
# ==============================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "DEBUG"},
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

DEFAULT_FROM_EMAIL = base.DEFAULT_FROM_EMAIL

EMAIL_HOST = base.EMAIL_HOST
EMAIL_PORT = base.EMAIL_PORT
EMAIL_USE_TLS = base.EMAIL_USE_TLS

EMAIL_HOST_USER = base.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = base.EMAIL_HOST_PASSWORD