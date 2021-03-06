# Generated by Django 3.2.9 on 2021-12-05 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
        ('product', '0004_auto_20211205_1513'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='active',
            field=models.BooleanField(default=False, verbose_name='فعال/غیر فعال '),
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ManyToManyField(blank=True, to='category.Category'),
        ),
    ]
