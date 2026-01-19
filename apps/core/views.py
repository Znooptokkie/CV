from django.shortcuts import render


def index(request):
    return render(request, "pages/index.html")

def opleidingen(request):
    return render(request, "pages/education.html")

def projecten(request):
    return render(request, "pages/projects.html")

def over_mij(request):
    return render(request, "pages/about_me.html")

def komt_binnenkort(request):
    return render(request, "pages/coming_soon.html")

def internal_server_error(request):
    return render(request, "pages/500.html")

def page_not_found(request):
    return render(request, "pages/404.html")

def too_many_requests(request):
    return render(request, "pages/429.html")
