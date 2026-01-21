from config.settings.base import BASE_DIR as BASE_DIR
from config.settings.base import INSTALLED_APPS as INSTALLED_APPS
from config.settings.base import MIDDLEWARE as MIDDLEWARE
from config.settings.base import ROOT_URLCONF as ROOT_URLCONF
from config.settings.base import TEMPLATES as TEMPLATES

DEBUG = True
SECRET_KEY = "dev-secret-key"
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]



# # ==============================
# # Basis settings
# # ==============================
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# # ==============================
# # Static files
# # ==============================
STATICFILES_DIRS = [BASE_DIR / "static"]