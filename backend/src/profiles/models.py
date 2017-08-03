from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
