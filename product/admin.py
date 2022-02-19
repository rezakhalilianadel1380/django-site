from django.contrib import admin

from product.models import Gallery, Product, Tag

# Register your models here.




admin.site.register(Product)
admin.site.register(Gallery)
admin.site.register(Tag)