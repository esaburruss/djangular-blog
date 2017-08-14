from collections import OrderedDict
from profiles.models import Profile
from profiles.api.serializers import ProfileDetailSerializer, ProfileListSerializer
from ..models import Blog, Category, Page, Section
from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject


class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'nav_title',
            'nav_url',
            'body',
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    author = ProfileDetailSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'body',
            'categories',
            'author',
        ]


class BlogListSerializer(serializers.ModelSerializer):
    author = ProfileListSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'author',
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    #blogs = serializers.SerializerMethodField()
    blogs = BlogListSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
            'blogs',
        ]


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]

class NavbarPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'nav_title',
            'nav_url',
        ]


class NavbarSerializer(serializers.ModelSerializer):
    nav_pages = NavbarPageSerializer(many=True, read_only=True, required=False)
    class Meta:
        model = Section
        fields = [
            'nav_title',
            'nav_url',
            'nav_pages',
        ]
    def to_representation(self, instance):
        result = super(NavbarSerializer, self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])
