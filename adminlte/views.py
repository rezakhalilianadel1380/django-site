from distutils.log import error
from itertools import product
from django.shortcuts import redirect, render
from product.models import Product, Gallery, Tag
from adminlte.forms import Admin_Login, Category_edite, Product_Forms, User_Form, Userdetail_Form, order_eidte_form, product_gallery_add_form
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.contrib.admin.views.decorators import staff_member_required
from account.models import User_detail
from django.contrib import messages
from django.core.paginator import Paginator
from jalali_date import datetime2jalali
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import get_object_or_404
from order.models import Order
from category.models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
from .serializer import Category_Serializer
from django.views.generic import ListView
from django.db.models import Q
# Create your views here.


@staff_member_required(login_url="/adminlte/login")
def dashbord(request):
    users = len(User.objects.all())
    orders = len(Order.objects.all())
    products = len(Product.objects.all())
    context = {
        'users': users,
        'orders': orders,
        'products': products,
    }
    return render(request, "dashbord_admin.html", context)


def loginadmin(request):
    form = Admin_Login(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = User.objects.filter(username=username).first()
        if user.is_staff and user.is_active:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('/adminlte')
            else:
                form.add_error('username', 'کاربر یافت نشد ')
        else:
            form.add_error('username', 'شما اجازه دسترسی  ندارید')
    context = {
        'form': form,
    }
    return render(request, 'login_admin.html', context)


@user_passes_test(lambda u: u.has_perm('product.view_product'), login_url='/adminlte')
@staff_member_required(login_url="/adminlte/login")
def admin_product(request):
    product = Product.objects.order_by("-datetime")
    q = request.GET.get('q',None)
    if q is not None:
        lookup=(
           Q(title__icontains=q)|
           Q(tag__tagname__icontains=q)
        )
        product = product.filter(lookup).distinct()
    paginator = Paginator(product, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        "page_obj": page_obj,
    }
    return render(request, "product/product/product_admin.html", context)


@staff_member_required(login_url="/adminlte/login")
def admin_product_delete(request, id):
    # product = Product.objects.filter(id=id).delete()
    messages.success(request, 'کالا با موفقیت حذف شد ')
    return redirect('/adminlte/product')


def tags_checker(tags_input, tags_query, product):
    error = []
    if tags_input == []:
        for i in tags_query:
            i.product.remove(product.id)
    else:
        for i in tags_input:
            if not Product.objects.filter(tag__tagname=i, id=product.id).exists():
                if Tag.objects.filter(tagname=i).exists():
                    tag = Tag.objects.filter(tagname=i).first()
                    tag.product.add(product.id)
                else:
                    tag = Tag.objects.create(tagname=i)
                    tag.product.add(product.id)
        for i in tags_query:
            if i.tagname not in tags_input:
                i.product.remove(product.id)
    return error


@user_passes_test(lambda u: u.has_perm('product.change_product'), login_url='/adminlte')
@staff_member_required(login_url="/adminlte/login")
def edit_product_admin(request, id):
    product = get_object_or_404(Product, id=id)
    tags_query = Tag.objects.filter(product=product)
    tags_error = []
    if request.method == 'POST':
        form = Product_Forms(
            request.POST, request.FILES, instance=product)
        tags = request.POST.getlist('tag')
        tags_error = tags_checker(tags, tags_query, product)
        if form.is_valid():
            form.save()
            messages.success(request, 'محصول با موفقیت ویرایش شد ')
            return redirect(f'/adminlte/product/edite/{id}')
        else:
            messages.error(
                request, "مشکلی پیش اومده لطفا در وارد کردن فیلد ها دقت کنید ")
    else:
        form = Product_Forms(instance=product)
    context = {
        'tag_error': tags_error,
        "form": form,
        'barchasb': tags_query,
        'products': product,
    }
    return render(request, "product/product/product_edit.html", context)


@user_passes_test(lambda u: u.has_perm('product.add_product'), login_url='/adminlte')
@staff_member_required(login_url="/adminlte/login")
def product_add_admin(request):
    if request.method == 'POST':
        form = Product_Forms(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            tags = request.POST.getlist('tag')
            for i in tags:
                if Tag.objects.filter(tagname=i).exists():
                    tag = Tag.objects.filter(tagname=i).first()
                    tag.product.add(product.id)
                else:
                    tag = Tag.objects.create(tagname=i)
                    tag.product.add(product.id)
            messages.success(request, 'محصول با موفقیت اضافه شد ')
            return redirect(f'/adminlte/product')
        else:
            messages.error(
                request, "مشکلی پیش امده لطفا مدتی بعد دوباره سعی کنید")
    else:
        form = Product_Forms()
    context = {
        "form": form,
    }
    return render(request, "product/product/product_add.html", context)


@staff_member_required(login_url="/adminlte/login")
def product_gallery(request):
    images = Gallery.objects.order_by('-time')
    q = request.GET.get('q')
    if q is not None:
        images = images.filter(title__icontains=q)
    paginator = Paginator(images, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        "page_obj": page_obj
    }
    return render(request, "product/gallery/product_gallery.html", context)


@staff_member_required(login_url="/adminlte/login")
def product_gallery_delete(request, id):
    images = Gallery.objects.filter(id=id).delete()
    messages.success(request, 'با موفقیت حذف شد ')
    return redirect("/adminlte/product/gallery")


@staff_member_required(login_url="/adminlte/login")
def product_gallery_add(request):
    if request.method == 'POST':
        form = product_gallery_add_form(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'عکس ایجاد شد ')
            return redirect(f'/adminlte/product/gallery')
        else:
            messages.error(
                request, "مشکلی پیش امده لطفا مدتی بعد دوباره سعی کنید")
    else:
        form = product_gallery_add_form()
    context = {
        "form": form,
    }
    return render(request, "product/gallery/product_gallery_add.html", context)


@staff_member_required(login_url="/adminlte/login")
def product_gallery_edite(request, id):
    gallery_object = Gallery.objects.filter(id=id).first()
    if request.method == 'POST':
        form = product_gallery_add_form(
            request.POST, request.FILES, instance=gallery_object)
        if form.is_valid():
            form.save()
            messages.success(request, 'عکس ایجاد شد ')
            return redirect(f'/adminlte/product/gallery')
        else:
            messages.error(
                request, "مشکلی پیش امده لطفا مدتی بعد دوباره سعی کنید")
    else:
        form = product_gallery_add_form(instance=gallery_object)
    context = {
        "form": form,
        'gallery_image': gallery_object,
    }
    return render(request, "product/gallery/gallery_edite.html", context)


@staff_member_required(login_url="/adminlte/login")
def order_list(request):
    orders = Order.objects.all()
    order_len = len(orders)
    order_len_paid = len(Order.objects.filter(paid=True))
    paginator = Paginator(orders, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        "page_obj": page_obj,
        "len": order_len,
        'paid': order_len_paid,
    }
    return render(request, "order/orders.html", context)


@staff_member_required(login_url="/adminlte/login")
def order_edite(request, id):
    order = get_object_or_404(Order, id=id)
    if request.method == 'POST':
        form = order_eidte_form(request.POST, request.FILES, instance=order)
        if form.is_valid():
            form.save()
            messages.success(request, 'محصول با موفقیت ویرایش شد ')
            return redirect(f'/adminlte/order/edite/{id}')
        else:
            messages.error(
                request, "مشکلی پیش اومده لطفا در وارد کردن فیلد ها دقت کنید ")
    else:
        form = order_eidte_form(instance=order)
    context = {
        'form': form,
    }
    return render(request, "order/order_edite.html", context)


@staff_member_required(login_url="/adminlte/login")
def category_list(request):
    category = Category.objects.order_by('-datetime')
    paginator = Paginator(category, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        "page_obj": page_obj,
    }
    return render(request, "category/category.html", context)


@staff_member_required(login_url="/adminlte/login")
def category_delete(request, id):
    category = Category.objects.filter(id=id).delete()
    messages.success(request, "دسته بندی با موفقیت حذف شد ")
    return redirect('/adminlte/category')


@staff_member_required(login_url="/adminlte/login")
def category_edite(request, id):
    category = Category.objects.filter(id=id).first()
    if request.method == 'POST':
        form = Category_edite(
            request.POST, instance=category)
        if form.is_valid():
            form.save()
            messages.success(request, 'دسته بندی  با موفقیت ویرایش شد ')
            return redirect(f'/adminlte/category/edite/{id}')
        else:
            messages.error(
                request, "مشکلی پیش اومده لطفا در وارد کردن فیلد ها دقت کنید ")
    else:
        form = Category_edite(instance=category)
    context = {
        'form': form,
    }
    return render(request, "category/category_edite.html", context)


@staff_member_required(login_url="/adminlte/login")
def category_add(request):
    if request.method == 'POST':
        form = Category_edite(
            request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'دسته بندی  با موفقیت ایجاد شد ')
            return redirect(f'/adminlte/category')
        else:
            messages.error(
                request, "مشکلی پیش اومده لطفا در وارد کردن فیلد ها دقت کنید ")
    else:
        form = Category_edite()
    context = {
        'form': form,
    }
    return render(request, "category/category_add.html", context)


class ChartjsApi(APIView):
    def get(self, request):
        date_now = datetime.datetime.now()
        order_paid = Order.objects.filter(paid=True)
        shamsi_month = {
            1: 'فروردین',
            2: "اردیبهشت",
            3: "خرداد",
            4: "مرداد",
            5: "تیر",
            6: "شهریور",
            7: "مهر",
            8: "ابان",
            9: "اذر",
            10: "دی",
            11: "بهمن",
            12: "اسفند",
        }
        selected = {}
        month = int(datetime2jalali(date_now).strftime('%m'))
        year = int(datetime2jalali(date_now).strftime('%y'))
        for i in range(0, 6):
            if month == 0:
                month = 12
                year -= 1
            for j in order_paid:
                order_month = int(datetime2jalali(
                    j.payment_paid).strftime('%m'))
                order_year = int(datetime2jalali(
                    j.payment_paid).strftime('%y'))
                if order_month == month and order_year == year:
                    if shamsi_month[order_month] in selected:
                        selected[shamsi_month[order_month]] += 1
                    else:
                        selected[shamsi_month[order_month]] = 1

            month -= 1
        respond = {
            "data": selected.values(),
            "lables": selected.keys(),
        }
        return Response(respond)


@user_passes_test(lambda u: u.has_perm('auth.change_user'), login_url='/login')
def edite_user(request, id):
    user = get_object_or_404(User, id=id)
    userdetail = User_detail.objects.get(user=user)
    if request.method == 'POST':
        form2 =Userdetail_Form(
            request.POST, request.FILES, instance=userdetail)
        form = User_Form(request.POST,request.FILES, instance=user)
        if form.is_valid() and form2.is_valid():
            form.save()
            form2.save()
            messages.success(request, 'کاربر با موفقیت بروزرسانی شد ')
            return redirect(f'/adminlte/user/edite/{id}')
        else:
            messages.error(
                request, "مشکلی پیش اومده لطفا در وارد کردن فیلد ها دقت کنید ")
    else:
        form = User_Form(instance=user)
        form2 = Userdetail_Form(instance=userdetail, initial={'user': user.id})
    context = {
        'form': form,
        'form2': form2,
    }
    return render(request, 'user/user_edite.html', context)


class Create_category(APIView):
    def post(self, request):
        serializer = Category_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


class User_List(ListView):
    template_name = "user/user_list.html"
    paginate_by = 6
    
    def get_context_data(self, *args, object_list=None, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        return context

    def get_queryset(self):
       user=User.objects.all()
       return user

        

