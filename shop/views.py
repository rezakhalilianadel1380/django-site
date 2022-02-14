from django.shortcuts import  redirect, render
from order.models import Order
from product.models import Product
from slider.models import Slider
from category.models import Category
import itertools


def mygrouper(n, iterable):
    args = [iter(iterable)] * n
    return ([e for e in t if e != None] for t in itertools.zip_longest(*args))

def header_render(request):
    category=Category.objects.all()
    context={
        'ordernumber':None,
        'categories':category
    }
    category=Category.objects.all()
    if request.user.is_authenticated:
        if Order.objects.filter(user_id=request.user.id,paid=False).exists():
            order=Order.objects.filter(user_id=request.user.id,paid=False).first()
            if order.orderdetail_set.all().exists():
                detail=len(order.orderdetail_set.all())
                context['ordernumber']=detail
    return render(request,'base/Header.html',context)




def homepage(request):
    slider=Slider.objects.all()
    lastest_products=list(mygrouper(3,Product.objects.order_by("-datetime")[:6]))
    best_price=Product.objects.order_by("-discount")[:5]
    products=Product.objects.all()
    context={
        "slider":slider,
        "lastest_product":lastest_products,
        "best_price":best_price,
        "products":products,

    }
    return render(request,'homepage.html',context)