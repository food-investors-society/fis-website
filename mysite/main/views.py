
from django.shortcuts import render, redirect
from django.http import  HttpResponse
from json import dumps
from main.models import Business
from main.models import Event

# Create your views here.
def map(request):
    businesses = Business.objects.all()
    events = Event.objects.all()
    b_data = []
    for business in businesses:
        b_data.append({
            "business_name": business.business_name,
            "email" : business.user.email,
            "phone" : business.phone,
            "address" : business.address,
            "postcode" : business.postcode,
            "description" : business.description,
            "latitude" : business.latitude,
            "longitude" : business.longitude,
            "type" : "business",
        })
    for event in events:
        b_data.append({
            "event_name": event.event_name,
            "email" : event.email,
            "phone" : event.phone,
            "address" : event.address,
            "postcode" : event.postcode,
            "description" : event.description,
            "latitude" : event.latitude,
            "longitude" : event.longitude,
            "type" : "event",
        })
    return render(request, 'map.html', {"bdata" : dumps(b_data)})