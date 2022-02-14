from django.shortcuts import redirect, render
from product.forms import Comment_Form
from .models import Comment
from django.contrib import messages
from product.models import Product
# Create your views here.


def add_comment(request):
    comment=Comment_Form(request.POST or None)
    if comment.is_valid():
        product_id=comment.cleaned_data.get("product_id")
        message=comment.cleaned_data.get("message")
        name=comment.cleaned_data.get("name")
        email=comment.cleaned_data.get("email")
        Comment.objects.create(name=name,email=email,product_id=product_id,message=message)
        messages.success(request,"نظر شما ثبت شد ")
        return redirect(f'products/{product_id}/{Product.objects.get(id=product_id).newstring()}')
   
