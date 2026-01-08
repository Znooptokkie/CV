import config.settings.base as base

DEBUG = False
ALLOWED_HOSTS = ["atillaoomen.nl"]

SECRET_KEY = base.SECRET_KEY
DATABASES = base.DATABASES
INSTALLED_APPS = base.INSTALLED_APPS
MIDDLEWARE = base.MIDDLEWARE
TEMPLATES = base.TEMPLATES
ROOT_URLCONF = base.ROOT_URLCONF

STATIC_URL = "/static/"
STATICFILES_DIRS = [base.BASE_DIR / "static"]
# Cache busting
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
