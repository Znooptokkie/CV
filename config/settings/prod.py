# import os

# from config.settings import base


# # ==============================
# # Installed apps, middleware, templates
# # ==============================
# INSTALLED_APPS = base.INSTALLED_APPS
# MIDDLEWARE = base.MIDDLEWARE
# TEMPLATES = base.TEMPLATES
# ROOT_URLCONF = base.ROOT_URLCONF


# # ==============================
# # Basis settings
# # ==============================
# DEBUG = False
# SECRET_KEY = base.SECRET_KEY
# ALLOWED_HOSTS = ["atillaoomen.nl", "www.atillaoomen.nl"]


# # ==============================
# # Static files
# # ==============================
# STATIC_URL = "/static/"
# STATIC_ROOT = os.getenv("DJANGO_STATIC_ROOT", base.BASE_DIR / "staticfiles")
# STATICFILES_DIRS = [
#         base.BASE_DIR / "static",
# ]
# # Mocht er een 500 server error zijn
# # verander onderstaande in ...storage.StaticFilesStorage
# STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"


# # ==============================
# # Database
# # ==============================
# DATABASES = {
#     "default": {
#         "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.mysql"),
#         "NAME": os.getenv("DB_NAME", base.DATABASES["default"]["NAME"]),
#         "USER": os.getenv("DB_USER", base.DATABASES["default"]["USER"]),
#         "PASSWORD": os.getenv("DB_PASSWORD", base.DATABASES["default"]["PASSWORD"]),
#         "HOST": os.getenv("DB_HOST", "localhost"),
#         "PORT": os.getenv("DB_PORT", "3306"),
#     }
# }


# # ==============================
# # Security
# # ==============================
# SECURE_BROWSER_XSS_FILTER = True
# X_FRAME_OPTIONS = "DENY"
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
# SECURE_SSL_REDIRECT = True

# # HSTS (optioneel)
# SECURE_HSTS_SECONDS = 3600
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True


# # ==============================
# # Email / externe services
# # ==============================
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# USE_EXTERNAL_API = True  # Flag voor eigen API calls of queues

from config.settings.base import *

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
