# Generated by Django 2.2.6 on 2020-02-02 23:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0033_auto_20200202_2133'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Activity',
            new_name='Event',
        ),
    ]
