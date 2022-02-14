from django.db import router
from django.urls import path,include
from product.views import ProductGenericViewset, ProductViewsetApi,Productlist,ProducDetail
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('product',ProductViewsetApi,basename='product')

router2=DefaultRouter()
router2.register('product',ProductGenericViewset,basename="productgeneric")

urlpatterns = [
    path('viewset',include(router.urls)),
    path('viewset/<pk>',include(router.urls)),
    path('generic',include(router2.urls)),
    path('products/',Productlist.as_view()),
    path('products/<pk>',Productlist.as_view()),
    # path('products/api',ProuductListApi.as_view()),
    # path('products/api/<pk>',ProuductDetailApi.as_view()),
    # path('products/genericapi',GenericProductView.as_view()),
    # path('products/genericapi/<int:pk>',GenericProductDetailView.as_view()),
    path('products/<pk>/<title>',ProducDetail.as_view()),
    path('hitcount/', include('hitcount.urls', namespace='hitcount')),
]