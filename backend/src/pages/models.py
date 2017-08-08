from __future__ import unicode_literals

from django.db import models
from django.db.models import permalink
from django.db.models import Max

def section_default():
    if Section.objects.all().count() == 0:
        new_order_default = 1
    else:
        new_order_default = Section.objects.all().aggregate(Max('order'))['order__max']+1
    return new_order_default

# Create your models here.

class Section(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    order = models.PositiveSmallIntegerField(unique=True, default = section_default)
    is_visible = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title
    def pages(self):
        pages = Page.objects.filter(section=self)
        if pages.count == 1:
            p = pages.get(0)
            p.order = self.order
            return p
        else:
            return pages


def page_default(p):
    pages = Page.objects.filter(section=p.section)
    if pages == 0:
        new_order_default = 1
    else:
        new_order_default = pages.aggregate(Max('order'))['order__max']+1
    return new_order_default

class Page(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    order = models.PositiveSmallIntegerField(default=1)
    body = models.TextField()
    is_visible = models.BooleanField(default=False)
    footer_link = models.BooleanField(default=False)
    section = models.ForeignKey(
        Section,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )
    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title
    class Meta:
        unique_together = (('section', 'order'),)

    def save(self, *args, **kwargs):
        print('AAA')
        if self.section is None:
            print('AAA')
            s = Section(
                title=self.title,
                is_visible=self.is_visible,
                slug=self.slug
            )
            s.save()
            print(s)
            self.section = s
        super(Page, self).save(*args, **kwargs)
