# Generated by Django 3.2.9 on 2021-12-22 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_city_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='state',
            name='state_code',
            field=models.IntegerField(null=True),
        ),
    ]
