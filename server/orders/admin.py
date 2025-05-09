from django.contrib import admin

# Register your models here.
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'invoice_no', 'customer', 'product', 'quantity', 'delivery_date','delivery_time', 'total_amount', 'customer_address', 'created',)

admin.site.register(Order, OrderAdmin)
