from django.db import models

# Create your models here.
class Content(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    changed_date = models.DateTimeField(auto_now=True)
    is_visible = models.BooleanField(default=False)

    class Meta:
        abstract = True
    def __str__(self):
        return self.title
    def __unicode__(self):
        return '%s' % self.title

def section_default():
    if Section.objects.all().count() == 0:
        new_order_default = 1
    else:
        new_order_default = Section.objects.all().aggregate(Max('order'))['order__max']+1
    return new_order_default


class Section(Content):
    order = models.PositiveSmallIntegerField(unique=True,
        default = section_default)

class Page(models.Model):
    order = models.PositiveSmallIntegerField(default=1)
    body = models.TextField()
    footer_link = models.BooleanField(default=False)
    section = models.ForeignKey(
        Section,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name='pages'
    )

    class Meta:
        unique_together = (('section', 'order'),)

    def save(self, *args, **kwargs):
        if self.section is None:
            s = Section(
                title=self.title,
                is_visible=self.is_visible,
                slug=self.slug
            )
            s.save()
            self.section = s
        super(Page, self).save(*args, **kwargs)


class Category(Content):
    def blogs(self):
        return Blog.objects.filter(categories=self.pk,
            related_name='categories')

    @permalink
    def get_absolute_url(self):
        return ('view_blog_category', None, { 'slug': self.slug })


class Blog(models.Model):
    body = models.TextField()
    categories = models.ManyToManyField(Category, )
    author = models.ForeignKey(Profile, on_delete=models.PROTECT)

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })
