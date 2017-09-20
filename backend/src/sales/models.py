from __future__ import unicode_literals

from django.db import models
from django.core.validators import validate_email

# Create your models here.
class Client(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True, validators=[validate_email,])
    phone = models.CharField(max_length=50)

    def __str__(self):
        return self.lastName + ', ' + self.firstName

class Product(models.Model):
    name = models.CharField(max_length=38)
    iframe = models.TextField(max_length=1000)
    details = models.TextField(max_length=500)
    url = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class ProductGroup(models.Model):
    name = models.CharField(max_length=25)
    products = models.ManyToManyField('Product')

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=50)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    serviceDate = models.DateTimeField(blank=True, null=True)
    serviceCharge = models.DecimalField(max_digits=6, decimal_places=2)
    products = models.ManyToManyField(Product, through='Transaction')
    details = models.TextField(max_length=500)

    def __str__(self):
        return self.name + ': ' + self.client.lastName + ', ' + self.client.firstName

class Transaction(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    purchaseDate = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.project.name + ' -> ' + self.product.name
