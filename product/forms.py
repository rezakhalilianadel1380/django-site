from itertools import count, product
from django import forms
from django.contrib.auth.models import User
from django.forms.widgets import Widget




class Add_To_Card(forms.Form):
    product_id=forms.IntegerField(widget=forms.HiddenInput())
    count = forms.CharField(widget=forms.TextInput(attrs={"class":"input-qty", "value":"1"}))




class Comment_Form(forms.Form):
    message=forms.CharField(widget=forms.Textarea(attrs={"id":"review_comment","spellcheck":"false","data-gramm":"false"}))
    name=forms.CharField(widget=forms.TextInput(attrs={"id":"author"}))
    email=forms.EmailField(widget=forms.EmailInput(attrs={"id":"email"}))
    product_id=forms.IntegerField(widget=forms.HiddenInput())