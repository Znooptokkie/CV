from django.shortcuts import render

from apps.core.classes.contact_form_processor import ContactFormProcessor
from apps.core.classes.rate_limiter import RateLimiter
from apps.core.forms import ContactForm


# PAGES
def index(request):
    return render(request, "pages/index.html")

def opleidingen(request):
    return render(request, "pages/education.html")

def projecten(request):
    return render(request, "pages/projects.html")

def over_mij(request):
    limiter = RateLimiter(
        key=request.META.get("REMOTE_ADDR"),
        limit=5,
        period=60,
    )

    if not limiter.hit():
        return render(request, "pages/429.html", status=429)

    form = ContactForm(request.POST or None)
    response = ContactFormProcessor.handle(request, form)
    if response:
        return response

    return render(request, "pages/about_me.html", {"form": form})

def komt_binnenkort(request):
    return render(request, "pages/coming_soon.html")


# HTTP CODES
def internal_server_error(request):
    return render(request, "pages/500.html", status=500)

def page_not_found(request, exception):
    return render(request, "pages/404.html", status=404)
