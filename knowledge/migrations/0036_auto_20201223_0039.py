# Generated by Django 3.1.4 on 2020-12-23 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0035_auto_20201214_1354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='8F7A2823-9891-4BE9-9F34-CD96068B2554', max_length=9, unique=True),
        ),
    ]
