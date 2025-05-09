from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_delivery_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer_address',
            field=models.TextField(blank=True, default=""),
        ),
    ]
