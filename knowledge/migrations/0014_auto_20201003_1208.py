# Generated by Django 3.1.1 on 2020-10-03 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0013_auto_20201003_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='C58FB1BC', max_length=8, unique=True),
        ),
    ]
