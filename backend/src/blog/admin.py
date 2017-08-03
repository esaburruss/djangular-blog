from django.contrib import admin
from blog.models import Blog, Category
# Register your models here.

class BlogAdmin(admin.ModelAdmin):
    exclude = ['posted']
    prepopulated_fields = {'slug': ('title',)}

class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'name_slug': ('name',)}

admin.site.register(Blog, BlogAdmin)
admin.site.register(Category, CategoryAdmin)
