from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

CONFIG_KEYS = (
    (1, 'domain'),
    (2, 'environment'),
    (3, 'blog_name'),
    (4, 'primary_color'),
    (5, 'secondary_color'),
    (6, 'allow_comments'),
)

NON_STRINGS = (6,)

class ConfigurationItem(models.Model):
    configuration_key = models.PositiveSmallIntegerField(
        choices=CONFIG_KEYS,
        primary_key=True)
    configuration_value = models.CharField(max_length=255)
    is_string = models.BooleanField(default=True, editable=False)

    def __str__(self):
        if is_string:
            return '{"%s": "%s"}' % (self.configuration_key, self.configuration_value)
        else:
            '{"%s": %s}' % (self.configuration_key, self.configuration_value)

    def save(self, *args, **kwargs):
        if self.configuration_key in NON_STRINGS:
            self.is_string = False
        super(ConfigurationItem, self).save(*args, **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    picture = models.ImageField(upload_to = 'profile-img', blank=True, null=True)
    facebook = models.CharField(max_length=256, blank=True, null=True)
    twitter = models.CharField(max_length=256, blank=True, null=True)
    instagram = models.CharField(max_length=256, blank=True, null=True)
    pinterest = models.CharField(max_length=256, blank=True, null=True)
    github = models.CharField(max_length=256, blank=True, null=True)
    stackoveflow = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self.user.first_name
    def username(self):
        return self.user.username
    def first_name(self):
        return self.user.first_name
    def last_name(self):
        return self.user.last_name
    def email(self):
        return self.user.email
