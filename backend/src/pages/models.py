from __future__ import unicode_literals

from django.db import models
from django.db.models import permalink
from django.db.models import Max

def section_default():
    if FooterLinks.objects.all().count() == 0:
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


class Page(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    order = models.PositiveSmallIntegerField(default=1)
    body = models.TextField()
    is_visible = models.BooleanField(default=False)
    footer_link = models.BooleanField(default=False)
    section = models.ForeignKey(Section, on_delete=models.PROTECT)

    class Meta:
        unique_together = (('section', 'order'),)

    def save(self, *args, **kwargs):
        print('AAA')
        if self.section is None:
            print('AAA')
            s = Section(title=self.title, is_visible=self.is_visible, slug=self.slug)
            s.save()
            print(s)
            self.section = s.pk
        super(Page, self).save(*args, **kwargs)
