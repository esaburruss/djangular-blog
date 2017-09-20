from __future__ import unicode_literals
from django.db import models, migrations

def create_defaults(apps, schema_editor):
    ConfigurationItem = apps.get_model("backend", "ConfigurationItem")
    db_alias = schema_editor.connection.alias

    ConfigurationItem.objects.using(db_alias).bulk_create([
        ConfigurationItem(
            
        ),
        ConfigurationItem(

        ),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_defaults),
    ]
