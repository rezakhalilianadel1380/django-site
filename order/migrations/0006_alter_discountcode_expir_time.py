# Generated by Django 3.2.9 on 2021-12-20 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0005_discountcode_expir_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discountcode',
            name='expir_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
