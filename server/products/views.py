# import all need models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework import viewsets, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    RetrieveUpdateAPIView,
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.response import Response

from .serializers import UserSerializer, ProductSerializer
from .models import Product

User = get_user_model()

# following method used to when received create user operation 
# and created successfully, then will generate a token for this user
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# !!!!!User controller!!!
# create a UserCreateView for control add new user request
class UserCreateView(CreateAPIView):
    # serializer_class - The serializer class that should be used for validating and deserializing input, and for serializing output. Typically, you must either set this attribute, or override the get_serializer_class() method.
    serializer_class = UserSerializer
    # queryset - The queryset that should be used for returning objects from this view. Typically, you must either set this attribute, or override the get_queryset() method. If you are overriding a view method, it is important that you call get_queryset()instead of accessing this property directly, as queryset will get evaluated once, and those results will be cached for all subsequent requests.
    queryset = User.objects.all()
    # permission_classes - defined the permission for these action
    # permission_classes = (permissions.IsAdminUser,)

# create a UserRetrieveUpdateView for control user retrieve & update request/data
class UserRetrieveUpdateView(RetrieveUpdateAPIView):
    # serializer_class - same as above
    serializer_class = UserSerializer
    # queryset - same as above
    queryset = User.objects.all()

# custom a ObtainAuthToken class
class CustomAuthToken(ObtainAuthToken):
    # when receive post request
    def post(self, request, *args, **kwargs):
        # get the user serializer
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        # get the user info
        user = serializer.validated_data['user']
        # get or create the user's token
        token, created = Token.objects.get_or_create(user=user)
        # return a response with user token and user id and username
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

# !!!!Product controller!!!
# create a ProductListView for get the products data
class ProductListView(ListAPIView):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # set permission which only authenticated user can get products list data
    permission_classes = [permissions.IsAuthenticated]

# create a ProductDetailView for get a product detail data
class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # set permission which only authenticated user can get product data
    permission_classes = [permissions.IsAuthenticated]
