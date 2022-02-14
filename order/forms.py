from django import forms

from account.models import State
from .models import DiscountCode

class Discount(forms.Form):
    discountcode=forms.CharField(widget=forms.TextInput(attrs={"placeholder":"کد تخفیف"," type":"text"}))
    
    def clean_discountcode(self):
        discount=self.cleaned_data.get("discountcode")
        D_Code_Object=DiscountCode.objects.filter(code=discount).first()
        if D_Code_Object is None:
            raise forms.ValidationError('کد تخفیف نامعتبر است')
        return discount

# class Address(forms.Form):
#     select = forms.ModelMultipleChoiceField(queryset=State.objects.all(),required=True,widget=forms.Select(attrs={'class': 'niceselect-option nice-select ','id':'AttorneyEmpresa','onchange':'handlecity(this)'}))

    
 