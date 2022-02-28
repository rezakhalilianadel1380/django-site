from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from account.models import City, State, User_detail,User_Address


# Register your models here.

class StateAdmin(admin.ModelAdmin):
    list_display=['__str__','state_code']
    list_editable=['state_code']
    class Meta:
        model=State

class User_detail_inline(admin.StackedInline):
    model=User_detail
    can_delete=False
    verbose_name_plural='user_detail'

class User_addrees(admin.StackedInline):
    model=User_Address
    can_delete=False
    verbose_name_plural='Address'

class Custom_admin(UserAdmin):
    inlines=(User_detail_inline,User_addrees)



admin.site.unregister(User)
admin.site.register(User_Address)
admin.site.register(User,Custom_admin)
admin.site.register(State,StateAdmin)
admin.site.register(City)
admin.site.register(User_detail)

