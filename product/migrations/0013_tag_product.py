# Generated by Django 3.2.9 on 2022-02-15 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0012_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='product',
            field=models.ManyToManyField(blank=True, null=True, to='product.Product'),
        ),
    ]
