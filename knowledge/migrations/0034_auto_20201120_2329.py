# Generated by Django 3.1.2 on 2020-11-20 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0033_auto_20201117_0011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='3551C0D1F', max_length=9, unique=True),
        ),
    ]
