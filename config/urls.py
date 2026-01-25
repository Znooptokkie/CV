from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("apps.core.urls")),
    path("api/", include("apps.endpoints.urls")),
]

handler404 = "apps.core.views.page_not_found"
handler500 = "apps.core.views.internal_server_error"
# handler403 = "core.views.permission_denied"
# handler400 = "core.views.bad_request"
