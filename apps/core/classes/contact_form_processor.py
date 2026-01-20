import logging

from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.utils.html import escape

logger = logging.getLogger(__name__)


class ContactFormProcessor:

    @classmethod
    def handle(cls, request, form):
        if not form.is_valid():
            return None 

        try:
            name = escape(form.cleaned_data["name"].strip())
            email = escape(form.cleaned_data["email"].strip())
            message = escape(form.cleaned_data["message"].strip())

            send_mail(
                subject=f"CV: Nieuw bericht van {name}",
                message=(
                    f"Naam: {name}\n"
                    f"Email: {email}\n\n"
                    f"Bericht:\n{message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
            )

            messages.success(request, "Je bericht is verzonden!")
            return redirect("over_mij")

        except Exception:
            logger.exception("Contact mail failed")
            messages.error(
                request,
                "Er ging iets mis met het verzenden. Probeer later opnieuw."
            )
            return None
