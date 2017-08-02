from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    first = models.CharField(max_length=64)
    last = models.CharField(max_length=64)
    picture = models.ImageField(upload_to = 'profile-img', blank=True, null=True)
    facebook = models.CharField(max_length=256, blank=True, null=True)
    twitter = models.CharField(max_length=256, blank=True, null=True)
    instagram = models.CharField(max_length=256, blank=True, null=True)
    pinterest = models.CharField(max_length=256, blank=True, null=True)
    github = models.CharField(max_length=256, blank=True, null=True)
    stackoveflow = models.CharField(max_length=256, blank=True, null=True)
