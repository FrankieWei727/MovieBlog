# Generated by Django 2.2.6 on 2020-01-23 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0029_auto_20200123_2026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.CharField(blank=True, default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='movie',
            name='rank',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]