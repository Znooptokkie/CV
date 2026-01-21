from config.settings.base import AUTH_PASSWORD_VALIDATORS as AUTH_PASSWORD_VALIDATORS
from config.settings.base import BASE_DIR
from config.settings.base import DATABASES as DATABASES
from config.settings.base import DEFAULT_AUTO_FIELD as DEFAULT_AUTO_FIELD
from config.settings.base import DEFAULT_FROM_EMAIL as DEFAULT_FROM_EMAIL
from config.settings.base import EMAIL_HOST as EMAIL_HOST
from config.settings.base import EMAIL_HOST_PASSWORD as EMAIL_HOST_PASSWORD
from config.settings.base import EMAIL_HOST_USER as EMAIL_HOST_USER
from config.settings.base import EMAIL_PORT as EMAIL_PORT
from config.settings.base import EMAIL_USE_TLS as EMAIL_USE_TLS
from config.settings.base import INSTALLED_APPS as INSTALLED_APPS
from config.settings.base import LANGUAGE_CODE as LANGUAGE_CODE
from config.settings.base import MIDDLEWARE as MIDDLEWARE
from config.settings.base import ROOT_URLCONF as ROOT_URLCONF
from config.settings.base import SECRET_KEY as SECRET_KEY
from config.settings.base import TEMPLATES as TEMPLATES
from config.settings.base import TIME_ZONE as TIME_ZONE
from config.settings.base import USE_I18N as USE_I18N
from config.settings.base import USE_TZ as USE_TZ
from config.settings.base import WSGI_APPLICATION as WSGI_APPLICATION

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
