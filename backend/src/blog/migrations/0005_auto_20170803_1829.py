# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-03 18:29
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20170803_1811'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='name_slug',
            new_name='slug',
        ),
        migrations.RenameField(
            model_name='category',
            old_name='name',
            new_name='title',
        ),
    ]
