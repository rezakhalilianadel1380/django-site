from django.shortcuts import redirect, render
from account.models import City, State, User_Address
from product.forms import Add_To_Card
from product.models import Product
from .models import DiscountCode, Order, OrderDetail
from django.contrib import messages
from django.views.generic import View
from django.http import JsonResponse
from .forms import  Discount
from django.contrib.auth.decorators import login_required
from django.utils.timezone import now
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import redirect
import json
from django.http import HttpResponse, Http404
from zeep import Client
# Create your views here.



class Ajax_Handler(View):
    
    def post(self,request):
        if request.is_ajax() :
          count=request.POST.get('count')
          order_id = request.POST.get('OrderId')
          detail=OrderDetail.objects.filter(id=order_id).first()
          detail.count=count
          detail.save()
          return JsonResponse({'count':detail.count},status=200)


class Ajax_Handler_city(View):
    def post(self,request):
        if request.is_ajax() :
          state=request.POST['state']
          cities=City.objects.filter(state__state_code=state)
          city=[i.name for i in cities]
          return JsonResponse({'city':city},status=200)

    # def post(self,request):
    #     if request.is_ajax():
    #         order_detail_id=request.POST.get('order_id')
    #         count=request.POST.get('count')
    #         detail=OrderDetail.objects.filter(id=order_detail_id,order__user_id=request.user.id).first()
    #         detail.count=count
    #         detail.save()
    #         return JsonResponse({'count':detail.count},status=200)
    #     return render(request,'tst.html',{})



@login_required(login_url='/login')
def cart(request):
    """ show cart """
    DiscountCode.objects.filter(expir_time__lte=now()).delete()
    form=Discount(request.POST or None)
    message=""
    order=Order.objects.filter(user_id=request.user.id,paid=False).first()
    if form.is_valid():
        discount_code=form.cleaned_data.get("discountcode")
        D_Code_object=DiscountCode.objects.filter(code=discount_code).first()
        order.discount=D_Code_object
        order.save()
        message="کد با موفقیت اعمال شد"
    context={
        "order":order,
        "form":form,
        "message":message,
    }
    return render(request,'cart.html',context)




@login_required(login_url='/login')
def delete_order(request,id):
    order=OrderDetail.objects.filter(id=id,order__user_id=request.user.id).delete()
    return redirect('/cart')


@login_required(login_url='/login')
def order(request):
    form=Add_To_Card(request.POST or None)
    if form.is_valid():
        count=int(form.cleaned_data.get('count'))
        product_id=form.cleaned_data.get('product_id')
        product=Product.objects.get(id=product_id)
        order=Order.objects.filter(user_id=request.user.id,paid=False).first()
        if order is None:
            order=Order.objects.create(user_id=request.user.id,paid=False)
        if count<0:
            count=1
        if order.orderdetail_set.filter(product_id=product_id).exists():
            messages.error(request,'این محصول قبلا به سبد خرید شما اضافه شده است ')
            return redirect(f'products/{product_id}/{product.newstring}')    
        OrderDetail.objects.create(order=order,product_id=product_id,price=product.discounts(),count=count)
        messages.success(request,'محصول با موفقیت به سبد خرید شما اضافه شده است ')
        return redirect(f'products/{product_id}/{product.newstring}')
    

@login_required(login_url='/login')
def checkout(request):
    order=Order.objects.filter(user_id=request.user.id,paid=False).first()
    if not order.orderdetail_set.all().exists():
        return redirect('/cart')
    states=State.objects.all()
    address=User_Address.objects.filter(user_id=request.user.id)
    if request.method=="POST":
        state=State.objects.filter(state_code=request.POST['select']).first()
        city=request.POST['city']
        posti=request.POST.get('posti')
        pelak=request.POST.get('pelak')
        User_Address.objects.create(user=request.user,state=state.name,City=city,post=posti,plak=pelak)
        return redirect('/checkout')
    context={
        'order':order,
        'states':states,
        'address':address,
      
    }
    return render(request,'checkout.html',context)


@login_required(login_url="/login")
def payment(request,id):
    return redirect(f"/request/{id}")




#######################################
# درگاه پرداخت 
MERCHANT = 'b19a8b8b-6d19-41a5-b963-b9a0a3e3d654'
amount = 1000  # Toman / Required
description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
email = 'email@example.com'  # Optional
mobile = '09123456789'  # Optional

client = Client('https://www.zarinpal.com/pg/services/WebGate/wsdl')
CallbackURL = 'http://localhost:8000/verify'  # Important: need to edit for realy server.


@login_required(login_url='/login')
def send_request(request, *args, **kwargs):
    orderid=kwargs.get('orderid')
    order=Order.objects.filter(user_id=request.user.id,paid=False,id=orderid).first()
    total=0
    if order is not None:
        if order.is_order():
            total=order.total_all()
            result = client.service.PaymentRequest(
                MERCHANT, total, description, email, mobile, f"{CallbackURL}/{orderid}"
            )
            if result.Status == 100:
                return redirect('https://www.zarinpal.com/pg/StartPay/' + str(result.Authority))
            else:
                return HttpResponse('Error code: ' + str(result.Status))
    raise Http404()


def verify(request):
    if request.GET.get('Status') == 'OK':
        result = client.service.PaymentVerification(MERCHANT, request.GET['Authority'], amount)
        if result.Status == 100:
            return HttpResponse('Transaction success.\nRefID: ' + str(result.RefID))
        elif result.Status == 101:
            return HttpResponse('Transaction submitted : ' + str(result.Status))
        else:
            return HttpResponse('Transaction failed.\nStatus: ' + str(result.Status))
    else:
        return HttpResponse('Transaction failed or canceled by user')
