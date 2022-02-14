from django.urls import path
from .views import (
Ajax_Handler,
cart, 
checkout,
delete_order,
order,
Ajax_Handler_city,
payment,
send_request,
verify
)
urlpatterns = [
    path('addtocart',order),
    path('cart',cart,name='cart'),
    path('cart/checkout',checkout,name='checkout'),
    path('adding',Ajax_Handler.as_view()),
    path('city',Ajax_Handler_city.as_view()),
    path('delete/<id>',delete_order),
    path('payment/<id>',payment),
    path('request/<orderid>',send_request, name='request'),
    path('verify/<orderid>', verify , name='verify'),
]