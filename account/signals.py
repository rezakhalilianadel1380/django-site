from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import User_detail

 
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        User_detail.objects.create(user=instance)




