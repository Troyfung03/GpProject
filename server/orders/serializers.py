from django.contrib.auth.models import User, Group
from rest_framework import serializers
 
from .models import Order
 
 
class OrderListSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()
    product = serializers.StringRelatedField()
    class Meta:
        model = Order
        fields = ('invoice_no', 'customer', 'product', 'quantity', 'total_amount', 'payment_id', 'payment_token')
 
 
class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('customer', 'product', 'quantity', 'total_amount', 'payment_id', 'payment_token')
