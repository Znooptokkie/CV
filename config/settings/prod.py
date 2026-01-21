from config.settings.base import BASE_DIR
from config.settings.base import INSTALLED_APPS as INSTALLED_APPS
from config.settings.base import MIDDLEWARE as MIDDLEWARE
from config.settings.base import ROOT_URLCONF as ROOT_URLCONF
from config.settings.base import TEMPLATES as TEMPLATES

DEBUG = False

# Gebruik de .env variabelen, fallback is leeg
ALLOWED_HOSTS = ["atillaoomen.nl", "www.atillaoomen.nl"]


STATIC_ROOT = BASE_DIR / "staticfiles"
# # Mocht er een 500 server error zijn
# # verander onderstaande in ...storage.StaticFilesStorage
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

# Security
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
