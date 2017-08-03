# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-03 15:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20170802_1820'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='first',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last',
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
