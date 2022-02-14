
from django.urls import path
from .views import loginpage,log_out, register,dashbord

urlpatterns = [
    path('login/',loginpage),
    path('logout/',log_out),
    path('register/',register),
    path('dashbord/',dashbord),
]