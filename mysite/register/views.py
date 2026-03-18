from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import SignupForm, LoginForm
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from main.models import Business

# Create your views here.

#Submiting the sign up data to the database
def signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            latitude = request.POST.get("latitude")
            longitude = request.POST.get("longitude")
            latitude = float(latitude) if latitude else None
            longitude = float(longitude) if longitude else None
            user = form.save()
            #Creating submitting the business data to the database, lat and lon have been fetched via the js function
            Business.objects.create(
                user=user,
                phone_number=form.cleaned_data["phone"],
                address=form.cleaned_data["address"],
                postcode=form.cleaned_data["postcode"],
                description=form.cleaned_data.get("description", ""),
                latitude=latitude,
                longitude=longitude,
            )
            htmly = get_template('user/Email.html')
            d = { 'username': username }
            subject, from_email, to = 'welcome', 'your_email@gmail.com', email
            html_content = htmly.render(d)
            msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            #send the user back to the main menu/map
            return redirect("map")
    else:
        form = SignupForm()



    return render(request, "sign-up.html", {"form": form})

#Log-in
def loginuser(request):
    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            #send the user back to the main menu/map
            return redirect("map")
    else:
        form = LoginForm()

    return render(request, "login.html", {"form": form})

def logoutuser(request):
    logout(request)
    return redirect("map")