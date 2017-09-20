from django.contrib import admin
from .models import Product, Project, Client, Transaction, ProductGroup
# Register your models here.
admin.site.register(Product)
admin.site.register(Project)
admin.site.register(Client)
admin.site.register(Transaction)
admin.site.register(ProductGroup)
