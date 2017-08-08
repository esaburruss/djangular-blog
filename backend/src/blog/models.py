from __future__ import unicode_literals

from django.db import models
from django.db.models import permalink
from profiles.models import Profile

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    body = models.TextField()
    posted = models.DateTimeField(db_index=True, auto_now_add=True)
    categories = models.ManyToManyField('blog.Category')
    author = models.ForeignKey(Profile, on_delete=models.PROTECT)

    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })

class Category(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True)

    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title
    def blogs(self):
        return Blog.objects.filter(categories=self.pk)

    @permalink
    def get_absolute_url(self):
        return ('view_blog_category', None, { 'slug': self.name_slug })
