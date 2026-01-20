from django import forms

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=50,
        widget=forms.TextInput(attrs={
            "placeholder": "Naam"
        })
    )
    email = forms.EmailField(
        max_length=120,
        widget=forms.EmailInput(attrs={
            "placeholder": "Email"
        })
    )
    message = forms.CharField(
        max_length=2000,
        widget=forms.Textarea(attrs={
            "placeholder": "Bericht"
        })
    )
    honeypot = forms.CharField(
        required=False,
        widget=forms.HiddenInput
    )


    def clean_honeypot(self):
        if self.cleaned_data.get("honeypot"):
            raise forms.ValidationError("Spam detected")
        return ""
