# Generated by Django 2.2.6 on 2020-01-20 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_profile', '0007_auto_20200120_0121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='cover',
            field=models.ImageField(default='/cover.jpg', upload_to='profile_cover'),
        ),
    ]
