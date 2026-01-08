import os

from config.settings import base

# ==============================
# Basis settings importeren
# ==============================
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
# CI omgeving (GitHub Actions)
# ==============================
if os.getenv("CI"):
    # Gebruik SQLite i.p.v. MySQL/Postgres
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": base.BASE_DIR / "db.sqlite3",
        }
    }

    # Test secrets
    SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "test-secret-key")
    DATABASES["default"]["NAME"] = os.getenv("DB_NAME", ":memory:")
    DATABASES["default"]["USER"] = os.getenv("DB_USER", "testuser")
    DATABASES["default"]["PASSWORD"] = os.getenv("DB_PASSWORD", "testpass")
    DATABASES["default"]["HOST"] = os.getenv("DB_HOST", "localhost")

    # Geen externe services
    EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
    USE_EXTERNAL_API = False  # flag in je eigen code voor API calls

# ==============================
# Logging
# ==============================
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "DEBUG"},
}
