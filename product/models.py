from itertools import product
from django.db import models
import os
import datetime
from ckeditor_uploader.fields import RichTextUploadingField
from django.db.models.base import Model
from django.utils import tree
from category.models import Category
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator
# Create your models here.


def change_name2(instance, filename):
    now = datetime.datetime.now()
    currenttime = now.strftime("%Y__%b__%d__%H__%M__%S")
    name, ext = os.path.splitext(os.path.basename(filename))
    return f'products/{currenttime}{ext}'


def change_name(instance, filename):
    now = datetime.datetime.now()
    currenttime = now.strftime("%Y__%b__%d__%H__%M__%S")
    name, ext = os.path.splitext(os.path.basename(filename))
    return f'gallery/{currenttime}{ext}'


class Product(models.Model):
    title = models.CharField(max_length=50)
    description = RichTextUploadingField()
    information = RichTextUploadingField()
    price = models.IntegerField()
    category = models.ManyToManyField(Category, blank=True)
    datetime = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=change_name2,
                              null=True, verbose_name='عکس')
    brand = models.CharField(max_length=50)
    discount = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    active = models.BooleanField(default=False, verbose_name='فعال/غیر فعال ')
    Number = models.IntegerField()  # number of products

    def __str__(self):
        return self.title

    def newstring(self):
        return self.title.replace(' ', '-')

    def discounts(self):
        if self.discount == 0:
            return self.price
        return int(self.price-(self.price*self.discount))


class Gallery(models.Model):
    title = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=change_name, null=True, blank=True)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Tag(models.Model):
    tagname = models.CharField(max_length=50)
    product = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return self.tagname
