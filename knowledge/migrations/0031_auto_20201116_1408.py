# Generated by Django 3.1.2 on 2020-11-16 14:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0030_auto_20201115_2216'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hub',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('hub', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_hubs', to='knowledge.hub')),
            ],
        ),
        migrations.RemoveField(
            model_name='post',
            name='category',
        ),
        migrations.AlterField(
            model_name='post',
            name='uuid',
            field=models.CharField(default='2261AC7FA', max_length=9, unique=True),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.AddField(
            model_name='post',
            name='hub',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='knowledge.hub'),
            preserve_default=False,
        ),
    ]
