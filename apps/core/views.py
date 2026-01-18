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