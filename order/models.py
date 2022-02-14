from django.db import models
from product.models import Product
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator




# Create your models here.

class DiscountCode(models.Model):
    code=models.CharField(max_length=200)
    discount_number=models.IntegerField(null=True,validators=[MinValueValidator(1),MaxValueValidator(100)])
    expir_time=models.DateTimeField(blank=True,null=True) 

    def __str__(self):
        return  self.code


  



class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    payment_paid=models.DateTimeField(blank=True,null=True,verbose_name='تاریخ پرداخت')
    paid=models.BooleanField(default=False)
    discount=models.ForeignKey(DiscountCode,null=True,blank=True,on_delete=models.SET_NULL)

    def __str__(self):
        return self.user.get_full_name()
    

    def detail_len(self):
        return len(self.orderdetail_set.all())

        
    def is_order(self):
        details=self.orderdetail_set.all().exists()
        if details:
            return True
        else:
            return False

    def total_order(self):
        total=0
        for price in self.orderdetail_set.all():
            total+=price.price*price.count
        if self.discount is None:
            return total
        else:
            return total-(total*(self.discount.discount_number/100))
        
    def total_with_post(self):
        total=self.total_order()
        if total>500000:
            return total
        return total+12000
        




class OrderDetail(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    price=models.IntegerField()
    count=models.IntegerField()
    
    class Meta:
        verbose_name='جزئیات محصول'
        verbose_name_plural='جزئیات محصولات'

    def totalprice(self):
        return self.price * self.count

    def __str__(self):
        return  self.product.title



