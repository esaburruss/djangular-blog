# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-10 13:01
from __future__ import unicode_literals

import content.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('changed_date', models.DateTimeField(auto_now=True)),
                ('is_visible', models.BooleanField(default=False)),
                ('body', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='profiles.Profile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('changed_date', models.DateTimeField(auto_now=True)),
                ('is_visible', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('changed_date', models.DateTimeField(auto_now=True)),
                ('is_visible', models.BooleanField(default=False)),
                ('order', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('body', models.TextField()),
                ('footer_link', models.BooleanField(default=False)),
                ('is_home', models.BooleanField(db_index=True, default=False, editable=False)),
            ],
            options={
                'ordering': ['section', 'order'],
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('changed_date', models.DateTimeField(auto_now=True)),
                ('is_visible', models.BooleanField(default=False)),
                ('order', models.PositiveSmallIntegerField(default=content.models.section_default, unique=True)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.AddField(
            model_name='page',
            name='section',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='pages', to='content.Section'),
        ),
        migrations.AddField(
            model_name='blog',
            name='categories',
            field=models.ManyToManyField(related_name='blogs', to='content.Category'),
        ),
        migrations.AlterUniqueTogether(
            name='page',
            unique_together=set([('section', 'order')]),
        ),
    ]
