# Generated by Django 2.2.6 on 2020-01-23 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0011_remove_article_active'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='rank',
            new_name='rate',
        ),
    ]