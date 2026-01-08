from .base import BASE_DIR

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

DEBUG = False
ALLOWED_HOSTS = ["atillaoomen.nl"]

# Cache busting
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
