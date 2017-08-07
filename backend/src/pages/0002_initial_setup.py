from __future__ import unicode_literals
from django.db import models, migrations

def create_defaults(apps, schema_editor):
    Page = apps.get_model("pages", "Page")
    db_alias = schema_editor.connection.alias
    Page.objects.using(db_alias).bulk_create([
        Page(
            title="Home",
            slug="index.html",
            body="<h1>Hello World!</h1>",
            is_visible=True,
            footer_link=True
        ),
        Page(
            title="About",
            slug="about",
            body="<p>Tell me baby, what's your story?</p>",
            is_visible=True,
            footer_link=True
        )
    ])

class Migration(migrations.Migration):

    dependencies = []

    operations = [
        migrations.RunPython(create_defaults),
    ]
