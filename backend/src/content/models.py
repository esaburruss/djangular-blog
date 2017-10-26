from __future__ import unicode_literals
import re

from django.db import models
from django.db.models import permalink
from django.db.models import Max
from django.db.utils import IntegrityError

from core.models import Profile

def gen_slug(title):
    return re.sub(r'[^\w]', '', title.replace(' ', '_').lower())
# Create your models here.
class Content(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    changed_date = models.DateTimeField(auto_now=True)
    is_visible = models.BooleanField(default=False)

    class Meta:
        abstract = True
    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = gen_slug(self.title)
            super().save(*args, **kwargs)


def section_default():
    if Section.objects.all().count() == 0:
        new_order_default = 1
    else:
        new_order_default = Section.objects.all().aggregate(Max('order'))['order__max']+1
    return new_order_default

class ContentImage(Content):
    image = models.ImageField(upload_to = 'content-img', blank=True, null=True)

class HtmlContent(Content):
    body = models.TextField()
    images = models.ManyToManyField(ContentImage, related_name='%(class)s')

    class Meta:
        abstract = True


class Section(Content):
    order = models.PositiveSmallIntegerField(unique=True,
        default = section_default)
    class Meta:
        ordering = ['order']
    def nav_pages(self):
        if self.pages.all().count() > 1:
            return self.pages.all()
        else:
            return None;
    def not_dropdown(self):
        if self.pages.all().count() == 1:
            return True
        else:
            return False
    def nav_slug(self):
        if self.not_dropdown():
            return self.pages.first().slug
        else:
            return self.slug
    def nav_title(self):
        if self.not_dropdown():
            return self.pages.first().title
        else:
            return self.title
    def nav_url(self):
        if self.not_dropdown():
            p = self.pages.first()
            return p.slug
        else:
            return None

class Page(HtmlContent):
    order = models.PositiveSmallIntegerField(blank=True, null=True)
    footer_link = models.BooleanField(default=False)
    section = models.ForeignKey(
        Section,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name='pages'
    )
    is_home = models.BooleanField(editable=False, db_index=True, default=False)

    class Meta:
        unique_together = (('section', 'order'),)
        ordering = ['section','order']

    def save(self, *args, **kwargs):
        if self.section is None:
            s = Section(
                title=self.title,
                is_visible=self.is_visible,
                slug=self.slug
            )
            s.save()
            self.section = s
            if self.order is None:
                self.order = 1
        else:
            if self.order is None:
                if Page.objects.filter(section=self.section).count() == 0:
                    self.order = 1
                else:
                    self.order = Page.objects.filter(section=self.section).aggregate(Max('order'))['order__max']+1
        super(Page, self).save(*args, **kwargs)
    def nav_title(self):
        return self.title
    def nav_url(self):
        return '/' + self.slug


class Category(Content):
    class Meta:
        verbose_name_plural = "categories"
    @permalink
    def get_absolute_url(self):
        return ('view_blog_category', None, { 'slug': self.slug })


class Blog(HtmlContent):
    categories = models.ManyToManyField(Category, related_name='blogs')
    author = models.ForeignKey(Profile, on_delete=models.PROTECT)

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })

    def get_categories(self):
        return Category.objects.filter(pk=1)
