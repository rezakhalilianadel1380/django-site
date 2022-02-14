from itertools import product
from django import forms
from django.contrib.auth.models import User
from django.core.validators import validate_email
# from captcha.fields import ReCaptchaField,ReCaptchaV2Checkbox 
# from django.core import validators


class Login(forms.Form):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class':'input-form',
            }),
         ) 
    password=forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class':'input-form input-login',
            'id':'myInput',
            })
         ) 
    
    # captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl':'fa'}) ,error_messages={'require':'لطفا تصویر امنیتی را وارد کنید   '})
    # def clean_username(self):
    #     username = self.cleaned_data.get('username')
    #     exitst = User.objects.filter(username=username).exists()
    #     if not exitst:
    #         raise forms.ValidationError('کاربر پیدا نشد ')
    #     return username

    # def clean_password(self):
    #     password = self.cleaned_data.get('password')
    #     if len(password)<=8:
    #         raise forms.ValidationError('رمز کمتر از 8 کاراکتر است ')
    #     return password



class Register(forms.Form):
    username = forms.CharField(widget=forms.TextInput(
        attrs={
            'class':'input-form',
            }),
         ) 

    first_name = forms.CharField(widget=forms.TextInput(
        attrs={
            'class':'input-form',
            }),
         ) 
    last_name=forms.CharField(widget=forms.TextInput(
        attrs={
            'class':'input-form',
            
            })
         ) 
    email=forms.EmailField(widget=forms.EmailInput(
        attrs={
            'class':'input-form ',
           
            })
         ) 
    password=forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class':'input-form input-login',
            'id':'showpass',
            })
         ) 

    repeat_password=forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class':'input-form input-login',
            'id':'showreppass',
            })
         ) 
    # captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl':'fa'}) ,error_messages={'require':'لطفا تصویر امنیتی را وارد کنید   '})
    
    news=forms.BooleanField(widget=forms.CheckboxInput(
        attrs={
            'class':'form-check-input',
            'id':'agree-condition-2',
            }),
             initial=False,
         ) 
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        exitst = User.objects.filter(username=username).exists()
        if exitst:
            raise forms.ValidationError('نام کاربری تکراری است ')
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        exitst = User.objects.filter(email=email).exists()  
        if exitst:
            raise forms.ValidationError('ایمیل قبلا ثبت شده ')
        try:
            validate_email(email)
        except:
            raise forms.ValidationError('لطفا ایمیل صحیح وارد کنید')
        return email

    def clean_repeat_password(self):
        password = self.cleaned_data.get('password')
        repeat_password = self.cleaned_data.get('repeat_password')
        if password != repeat_password:
            raise forms.ValidationError('رمز عبور مطابقت نمیکند')
        return repeat_password

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password)<8:
            raise forms.ValidationError('رمز عبور کمتر از 8 کاراکتر است ')
        return  password
