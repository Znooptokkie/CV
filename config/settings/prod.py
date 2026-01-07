# settings/base.py
STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

# settings/prod.py
from .base import *

DEBUG = False
ALLOWED_HOSTS = ["atillaoomen.nl"]

# Cache busting
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
