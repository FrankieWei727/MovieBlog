# Generated by Django 2.2.6 on 2020-01-28 01:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_profile', '0013_auto_20200128_0058'),
    ]

    operations = [
        migrations.RenameField(
            model_name='followuser',
            old_name='pub_date',
            new_name='created_date',
        ),
    ]
