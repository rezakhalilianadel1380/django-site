from django.contrib import admin

from order.models import DiscountCode, Order, OrderDetail

# Register your models here.



admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(DiscountCode)