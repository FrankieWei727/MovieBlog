# Generated by Django 2.2.6 on 2020-01-20 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_profile', '0009_auto_20200120_0247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
