from django.contrib import admin
from .models import Page, Section
# Register your models here.

class PageAdmin(admin.ModelAdmin):
    #exclude = ['posted']
    prepopulated_fields = {'slug': ('title',)}

class SectionAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Page, PageAdmin)
admin.site.register(Section, SectionAdmin)
# Register your models here.
