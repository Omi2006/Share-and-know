# Generated by Django 3.1.2 on 2020-11-14 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0022_auto_20201106_2216'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='name',
            new_name='title',
        ),
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='5A278FF29', max_length=9, unique=True),
        ),
    ]
