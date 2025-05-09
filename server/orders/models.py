from django.db import models
from django.conf import settings
from products.models import Product
from random import randint
from datetime import datetime
# Create your models here.

class Order (models.Model):
    invoice_no      = models.IntegerField(blank=True)
    customer        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    product         = models.ForeignKey (Product, on_delete=models.DO_NOTHING)
    quantity        = models.IntegerField ()
    total_amount    = models.DecimalField (max_digits=10, decimal_places=2, blank=True)
    created         = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated         = models.DateTimeField(auto_now=True, auto_now_add=False)
    payment_id      = models.CharField(max_length=100, blank=True, default="")
    payment_token   = models.CharField(max_length=100, blank=True, default="")
    delivery_date   = models.DateField()
    delivery_time   = models.TimeField()
    customer_address = models.TextField(blank=True, default="")

    def __str__(self):
        return str(self.invoice_no)

    def save(self, *args, **kwargs):
        if not self.invoice_no:
            self.invoice_no = generating_inovice()
        super(Order, self).save(*args, **kwargs)

    def confirm_order(self):
        # update product quantity
        # After client payed
        self.product.quantity -= self.quantity
        self.product.save()
        self.payment_token = ''
        self.save()



def generating_inovice():
    i = ''.join(["%s" % randint(0,9) for num in range(0,5)])
    date_of_today = datetime.now().date().strftime("%d%m%Y")
    invoice = i + date_of_today
    try:
        Order.objects.get(invoice_no=invoice)
        return generating_inovice()
    except Order.DoesNotExist as e:
        return invoice