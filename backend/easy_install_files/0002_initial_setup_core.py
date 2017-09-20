from __future__ import unicode_literals
from django.db import models, migrations
from django.contrib.auth.admin import User

def create_defaults(apps, schema_editor):
    superuser = User(
        username='esaburruss',
        first_name='Edward',
        last_name='Burruss',
        email='edward@esaburruss.com'
    )
    superuser.is_active = True
    superuser.is_superuser = True
    superuser.is_staff = True
    superuser.set_password('p@ssword')
    superuser.save()

    Profile = apps.get_model("core", "Profile")
    Usr = apps.get_model("auth", "User")
    db_alias = schema_editor.connection.alias
    Profile.objects.using(db_alias).bulk_create([
        Profile(
            user=Usr.objects.using(db_alias).get(pk=1),
            picture='profile-img/Headshot.jpg',
            facebook='BudBurruss',
            twitter='esaburruss',
            instagram='budburruss',
            github='esaburruss'
        )
    ])

    ConfigurationItem = apps.get_model("core", "ConfigurationItem")

    ConfigurationItem.objects.using(db_alias).bulk_create([
        ConfigurationItem(
            configuration_key = 1,
            configuration_value = "E.S.A. Burruss",
        ),
        ConfigurationItem(
            configuration_key = 6,
            configuration_value = "False",
            is_string = False,
        ),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_defaults),
    ]
