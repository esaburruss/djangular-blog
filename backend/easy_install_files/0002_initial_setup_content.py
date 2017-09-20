from __future__ import unicode_literals
from django.db import models, migrations

def create_defaults(apps, schema_editor):
    Section = apps.get_model("content", "Section")
    Page = apps.get_model("content", "Page")
    Category = apps.get_model("content", "Category")
    Blog = apps.get_model("content", "Blog")
    Profile = apps.get_model("core", "Profile")
    db_alias = schema_editor.connection.alias
    Section.objects.using(db_alias).bulk_create([
        Section(
            title="About",
            slug="about",
            is_visible=True,
            order=1
        ),
        Section(
            title="Dropdown",
            slug="dropdown",
            is_visible=True,
            order=2
        )
    ])
    Page.objects.using(db_alias).bulk_create([
        Page(
            title="Home",
            slug="home",
            body="<p>Welcome To my Djangular Blog! This engine was created by <a href=\"www.esaburruss.com\">Edward Burruss</a></p>",
            is_visible=True,
            footer_link=True,
            order=0,
            is_home=True
        ),
        Page(
            title="About",
            slug="about",
            body="<p>Generic About Page for author/company</p><p>Edward Burruss is a Software Engineer at <a href=\"www.messagegears.com\">MessageGears</a></p>",
            is_visible=True,
            footer_link=True,
            order=1,
            section=Section.objects.using(db_alias).get(pk=1)
        ),
        Page(
            title="Page 1",
            slug="page-1",
            body="<p>A New Hope</p>",
            is_visible=True,
            order=1,
            section=Section.objects.using(db_alias).get(pk=2)
        ),
        Page(
            title="Page 2",
            slug="page-2",
            body="<p>The Empire Strikes Back</p>",
            is_visible=True,
            order=2,
            section=Section.objects.using(db_alias).get(pk=2)
        ),
        Page(
            title="Page 3",
            slug="page-3",
            body="<p>Return of the Jedi</p>",
            is_visible=True,
            order=3,
            section=Section.objects.using(db_alias).get(pk=2)
        )
    ])
    Category.objects.using(db_alias).bulk_create([
        Category(
            title="Test Category",
            slug="test-category",
            is_visible=True
        ),
        Category(
            title="Software Engineering",
            slug="software-engineering",
            is_visible=True
        ),
        Category(
            title="Gaming",
            slug="gaming",
            is_visible=True
        )
    ])
    p = Profile.objects.using(db_alias).get(pk=1)
    Blog.objects.using(db_alias).bulk_create([
        Blog(
            title="Test Blog",
            slug="test-blog-1",
            body="<p>Hello World!</p>",
            is_visible=True,
            author=p
        ),
        Blog(
            title="Test Blog 2",
            slug="test-blog-2",
            body="<p>Hello World!</p>",
            is_visible=True,
            author=p
        ),
        Blog(
            title="Test Blog 3",
            slug="test-blog-3",
            body="<p>Hello World!</p>",
            is_visible=True,
            author=p
        )
    ])
    for blog in Blog.objects.using(db_alias).all():
        blog.categories.add(Category.objects.using(db_alias).get(pk=1))


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0001_initial'),
        ('core', '0001_initial'),
        ('core', '0002_initial_setup_core'),
    ]

    operations = [
        migrations.RunPython(create_defaults),
    ]
