from ..models import Product, ProductGroup
from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'title',
            'slug',
            'body',
            'categories',
            'creation_date',
            'author',
        ]


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'title',
            'slug',
            'creation_date',
            'author',
        ]
