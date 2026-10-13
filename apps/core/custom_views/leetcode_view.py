from django.shortcuts import render

from apps.core.models.leetcode.problem import Leetcode


def leetcode(request):
    query = Leetcode.objects.prefetch_related("used_functions").order_by("problem_number")

    return render(request, "pages/leetcode.html", {"leetcode": query},)