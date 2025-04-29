from django.contrib import admin

# Register your models here.
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    readonly_fields=('created', 'updated',)

admin.site.register(Product, ProductAdmin)