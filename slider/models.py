from django.db import models

# # Create your models here.
import os,datetime



def change_name(instance,filename):
    now=datetime.datetime.now()
    currenttime=now.strftime("%Y__%b__%d__%H__%M__%S")
    name,ext=os.path.splitext(os.path.basename(filename))
    return  f'Slider/{currenttime}{ext}'


class Slider(models.Model):
    name=models.CharField(max_length=100)
    link=models.URLField()
    image=models.ImageField(upload_to=change_name,null=True,blank=True)

    def __str__(self):
        return  self.name
        