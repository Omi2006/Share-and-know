# Generated by Django 3.1.2 on 2020-11-15 17:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0024_auto_20201115_1749'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2020, 11, 15, 17, 56, 21, 622404)),
        ),
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='81FDA456A', max_length=9, unique=True),
        ),
    ]