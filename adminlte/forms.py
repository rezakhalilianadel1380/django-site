from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from account.models import User_detail
from category.models import Category
from order.models import Order
from jalali_date.fields import JalaliDateField, SplitJalaliDateTimeField
from jalali_date.widgets import AdminJalaliDateWidget, AdminSplitJalaliDateTime
from product.models import Gallery, Product, Tag
from django.contrib.auth.models import User


class Admin_Login(forms.Form):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': "نام کاربری ",
        }),
    )
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': "رمز عبور",
        })
    )




class Product_Forms(forms.ModelForm):
    class Meta:
        model = Product
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(Product_Forms, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})
        self.fields['price'].widget.attrs.update({'class': 'form-control'})
        self.fields['category'].widget.attrs.update(
            {'class': 'form-control select2'})
        self.fields['discount'].widget.attrs.update({'class': 'form-control'})
        self.fields['brand'].widget.attrs.update({'class': 'form-control'})
        self.fields['Number'].widget.attrs.update({'class': 'form-control'})
        self.fields['active'].widget.attrs.update({'class': 'minimal'})


class product_gallery_add_form(forms.ModelForm):
    class Meta:
        model = Gallery
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(product_gallery_add_form, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})
        self.fields['product'].widget.attrs.update(
            {'class': 'form-control  select2'})


class order_eidte_form(forms.ModelForm):
    class Meta:
        model = Order
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(order_eidte_form, self).__init__(*args, **kwargs)
        self.fields['payment_paid'] = SplitJalaliDateTimeField(
            label=('date'), widget=AdminSplitJalaliDateTime)
        self.fields['user'].widget.attrs.update(
            {'class': 'form-control select2'})
        self.fields['discount'].widget.attrs.update(
            {'class': 'form-control  '})


class Category_edite(forms.ModelForm):
    class Meta:
        model = Category
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(Category_edite, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update(
            {'class': 'form-control'})
        self.fields['name'].widget.attrs.update(
            {'class': 'form-control  '})


class User_Form(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(User_Form, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control'})
        self.fields['password'].widget.attrs.update({'class': 'form-control'})
        self.fields['email'].widget.attrs.update({'class': 'form-control'})
        self.fields['first_name'].widget.attrs.update(
            {'class': 'form-control'})
        self.fields['last_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['groups'].widget.attrs.update(
            {'class': 'form-control  select2'})
        self.fields['user_permissions'].widget.attrs.update(
            {'class': 'form-control  select2'})


class Userdetail_Form(forms.ModelForm):
    class Meta:
        model = User_detail
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(Userdetail_Form, self).__init__(*args, **kwargs)
        self.fields["user"].widget = forms.HiddenInput()
       

