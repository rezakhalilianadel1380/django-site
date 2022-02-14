from django.db import models
from django.contrib.auth.models import User
import os,datetime


def change_name2(instance,filename):
    now=datetime.datetime.now()
    currenttime=now.strftime("%Y__%b__%d__%H__%M__%S")
    name,ext=os.path.splitext(os.path.basename(filename))
    return  f'avatar/{currenttime}{ext}'


class User_Address(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    state=models.CharField(max_length=50)
    City=models.CharField(max_length=50)
    post=models.CharField(max_length=100)
    plak=models.CharField(max_length=10)

    def __str__(self):
        return self.user.username

class State(models.Model):
    state_code=models.IntegerField(null=True)
    name=models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class City(models.Model):
    name=models.CharField(max_length=50)
    state=models.ForeignKey(State,on_delete=models.SET_NULL,null=True,blank=True)

    def __str__(self):
        return self.name


class User_detail(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to=change_name2,blank=True,null=True,verbose_name='عکس')
    
    def __str__(self) :
        return self.user.username



