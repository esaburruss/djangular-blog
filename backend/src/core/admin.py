from django.contrib import admin

# Register your models here.
from .models import Profile, ConfigurationItem

admin.site.register(Profile)
admin.site.register(ConfigurationItem)
