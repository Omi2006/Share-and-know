# Generated by Django 3.1.4 on 2020-12-26 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0037_auto_20201226_1728'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='', max_length=30, unique=True),
        ),
    ]