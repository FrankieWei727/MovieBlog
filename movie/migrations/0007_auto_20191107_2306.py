# Generated by Django 2.2.6 on 2019-11-07 23:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0006_auto_20191103_0214'),
    ]

    operations = [
        migrations.RenameField(
            model_name='activity',
            old_name='date',
            new_name='end_date',
        ),
        migrations.RenameField(
            model_name='activity',
            old_name='todate',
            new_name='start_date',
        ),
    ]