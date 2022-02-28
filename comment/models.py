from itertools import product
from django.db import models
from product.models import Product
# Create your models here.


class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self) -> str:
        return f"{self.product}--{self.name}"
