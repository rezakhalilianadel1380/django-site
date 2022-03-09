from itertools import product
from os import stat
from django.shortcuts import render
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from hitcount.views import HitCountDetailView
from category.models import Category
from comment.models import Comment
from rest_framework.views import APIView
from rest_framework.response import Response
from product.forms import Add_To_Card, Comment_Form
from .models import Gallery, Product
from .serializers import Product_Serializer
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
# Create your views here.


class Productlist(ListView):
    template_name = "list_view.html"
    paginate_by = 6

    def get_context_data(self, *args, object_list=None, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        return context

    def get_queryset(self):
        request = self.request
        allproduct = Product.objects.all()
        select = request.GET.get('filter')
        match select:
            case '0':
                pass
            case 'name':
                allproduct = allproduct.order_by('title')
            case 'date':
                allproduct = allproduct.order_by('title')
            case 'cheap':
                allproduct = allproduct.order_by('price')[0:2]
            case 'expensive':
                allproduct = allproduct.order_by('title')[0:2]
            case _:
                pass

        return allproduct


class ProducDetail(HitCountDetailView):
    model = Product
    template_name = "detail_view.html"
    count_hit = True
    context_object_name = 'product'

    def get_context_data(self, *args, object_list=None, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        product_id = self.kwargs.get('pk')
        form = Add_To_Card(self.request.POST or None,
                           initial={'product_id': product_id})
        gallery = Gallery.objects.filter(product_id=product_id)
        comment_form = Comment_Form(initial={"product_id": product_id})
        comments = Comment.objects.filter(product__id=product_id)
        products = Product.objects.exclude(id=product_id).filter(
            category__product__id=product_id)
       
        context.update({
            'gallery': gallery,
            'form': form,
            'comment': comment_form,
            'comments': comments,
            'products': products,
        })
        return context

    def get_object(self):
        request = self.request
        productid = self.kwargs.get('pk')
        product = Product.objects.get(id=productid)
        return product


# class ProuductListApi(APIView):
#     def get(self, request):
#         product = Product.objects.all()
#         serializer = Product_Serializer(product, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = Product_Serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors)


# class ProuductDetailApi(APIView):
#     def get(self,request,pk):
#         product = Product.objects.get(pk=pk)
#         serializer = Product_Serializer(product)
#         return Response(serializer.data)

#     def put(self,request,pk):
#         product=Product.objects.get(pk=pk)
#         serializer = Product_Serializer(product,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_200_OK)
#         return Response(serializer.errors)

#     def delete(self,request,pk):
#         product=Product.objects.get(pk=pk)
#         product.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# class GenericProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
#     serializer_class=Product_Serializer
#     queryset=Product.objects.all()
#     authentication_classes=[SessionAuthentication,BasicAuthentication]
#     permission_classes=[IsAuthenticated]

#     def get(self,request):
#         return self.list(request)

#     def post(self,request):
#         return self.create(request)


# class GenericProductDetailView(generics.GenericAPIView,mixins.UpdateModelMixin,mixins.RetrieveModelMixin,mixins.DestroyModelMixin):
#     serializer_class=Product_Serializer
#     queryset=Product.objects.all()
#     authentication_classes=[SessionAuthentication,BasicAuthentication]
#     permission_classes=[IsAuthenticated]

#     def get(self,request,pk):
#         return self.retrieve(request)

#     def put(self,request,pk):
#         return self.update(request,pk)

#     def delete(self,request,pk):
#         return self.destroy(request,pk)


class ProductViewsetApi(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        product = Product.objects.all()
        serializer = Product_Serializer(product, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = Product_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        serializer = Product_Serializer(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        serializer = Product_Serializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors)

    def destroy(self, request, pk=None):
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProductGenericViewset(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = Product_Serializer
    queryset = Product.objects.all()
