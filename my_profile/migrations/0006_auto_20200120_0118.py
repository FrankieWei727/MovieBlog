# Generated by Django 2.2.6 on 2020-01-20 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_profile', '0005_auto_20200120_0118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='cover',
            field=models.ImageField(default='cover.png', upload_to='profile_cover'),
        ),
    ]