# Generated by Django 3.1.2 on 2020-11-15 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0026_auto_20201115_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='6947E6D10', max_length=9, unique=True),
        ),
    ]
