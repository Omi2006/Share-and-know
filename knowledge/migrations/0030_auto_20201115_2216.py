# Generated by Django 3.1.2 on 2020-11-15 22:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0029_auto_20201115_2215'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='DB4D9B3B8', max_length=9, unique=True),
        ),
    ]