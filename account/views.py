from django.shortcuts import render,redirect
from account.forms import Login, Register
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.models import User
from django.contrib import messages
from .models import User_detail
# from django.contrib.auth.decorators import login_required


# /** 
#  * @Author: reza
#  * @Date: 2021-12-02 10:35:54 
#  * @Desc:  registerpage note: don t change this func
#   **/
def register(request):
    if request.user.is_authenticated:
        return redirect('/')
    register_form=Register(request.POST or None)
    if register_form.is_valid():
        username=register_form.cleaned_data.get('username')
        first_name=register_form.cleaned_data.get('first_name')
        last_name=register_form.cleaned_data.get('last_name')
        email=register_form.cleaned_data.get('email')
        password=register_form.cleaned_data.get('password')
        news=register_form.cleaned_data.get('news')
        user=User.objects.create(username=username,first_name=first_name,email=email,last_name=last_name,password=password)
        user_detail=User_detail.objects.create(user=user)
        if news:
           user_detail.news=True
           user_detail.save()
        messages.success(request,'ثبت نام با موفقیت انجام شد ')
        return redirect('/login') 
    context={
       'form':register_form,
    }
    return render(request,'register.html',context)


def dashbord(request):
    return render(request,'dashbord.html',{})


def loginpage(request):
    if request.user.is_authenticated:
        return redirect('/')
    login_form=Login(request.POST or None)  
    if login_form.is_valid():
        username=login_form.cleaned_data.get('username')
        password=login_form.cleaned_data.get('password')
        user=authenticate(request,username=username,password=password)
        if user:
            login(request,user)
            return redirect('/')
        else:
            login_form.add_error('username','کاربر یافت نشد ')
    context={
        'form':login_form,
    }
    return render(request,'login.html',context)



def log_out(request):   
    logout(request)
    return redirect('/')
   
   