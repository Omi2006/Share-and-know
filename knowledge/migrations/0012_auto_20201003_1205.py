# Generated by Django 3.1.1 on 2020-10-03 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0011_auto_20200926_1205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.UUIDField(default='d2d254ee', unique=True),
        ),
    ]
