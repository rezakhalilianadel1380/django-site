# Generated by Django 3.2.9 on 2021-12-05 11:43

from django.db import migrations, models
import django.utils.timezone
import product.models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_gallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='datetime',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='gallery',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=product.models.change_name),
        ),
    ]
