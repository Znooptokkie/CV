from config.settings.base import *


# # ==============================
# # Basis settings
# # ==============================
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# # ==============================
# # Static files
# # ==============================
STATICFILES_DIRS = [BASE_DIR / "static"]