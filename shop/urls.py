from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.urls import include
from shop.views import header_render, homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Header', header_render, name='Header'),
    path('', homepage, name='homepage'),
    path('', include('account.urls')),
    path('', include('product.urls')),
    path('', include('about_us.urls')),
    path('', include('order.urls')),
    path('', include('comment.urls')),
    path('adminlte/', include('adminlte.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + \
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + \
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
