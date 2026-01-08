import config.settings.base as base

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

SECRET_KEY = base.SECRET_KEY
DATABASES = base.DATABASES
INSTALLED_APPS = base.INSTALLED_APPS
MIDDLEWARE = base.MIDDLEWARE
TEMPLATES = base.TEMPLATES
ROOT_URLCONF = base.ROOT_URLCONF

STATIC_URL = "/static/"
STATICFILES_DIRS = [base.BASE_DIR / "static"]


# Log errors to console
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "DEBUG"},
}
