from django.urls import path
from .views import add_comment


urlpatterns = [
    path('addcomment',add_comment),
]