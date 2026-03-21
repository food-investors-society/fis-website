from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from main.models import Business



class SignupForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Business Email")
    name = forms.CharField(required=True, label="Business Name")
    phone = forms.CharField(required=True , label="Business Phone Number")
    address = forms.CharField(required=True , label="Business Address")
    postcode = forms.CharField(required=True, label="Business Postcode")
    description = forms.CharField(widget=forms.Textarea, required=False, label="Give a description of your business")

    class Meta:
        model = User
        fields = ["username", "password1", "password2", "name", "email", "phone", "address", "postcode", "description"]

    def save(self, commit=True):
        user = super().save(commit=False)
        email = self.cleaned_data["email"].strip().lower()

        if commit:
            user.save()

        return user


class LoginForm(AuthenticationForm):
    username = forms.CharField(required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True)

class EditBusinessForm(forms.ModelForm):
    name = forms.CharField(required=True, label="Business Name")
    phone = forms.CharField(required=True , label="Business Phone Number")
    address = forms.CharField(required=True , label="Business Address")
    postcode = forms.CharField(required=True, label="Business Postcode")
    description = forms.CharField(widget=forms.Textarea, required=False, label="Give a description of your business")
    class Meta:
        model = Business
        fields = ["name", "phone", "address", "postcode", "description"]

class UpdateUserForm(forms.ModelForm):
    username = forms.CharField(required=True)
    email = forms.EmailField(required=True, label="Business Email")
    class Meta:
        model = User
        fields = ["username", "email"]