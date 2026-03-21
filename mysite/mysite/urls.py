"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from main import views
from register import views as v
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('sign-up/', v.signup, name='signup'),
    path('login/', v.loginuser, name='login'),
    path('logout/', v.logoutuser, name='logout'),
    path('editdetails/', v.editdetails, name='editdetails'),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='sendresetemail.html'), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='resetlinksent.html'), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='changepassword.html'), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='passwordchanged.html'), name='password_reset_complete'),
]
