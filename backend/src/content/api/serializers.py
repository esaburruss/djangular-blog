from collections import OrderedDict
from profiles.models import Profile
from profiles.api.serializers import ProfileDetailSerializer, ProfileListSerializer
from ..models import Blog, Category, Page, Section, HtmlContent
from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject

class HtmlPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'body',
        ]


class HtmlBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'body',
            'categories',
        ]


class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'title',
            'slug',
            'body',
        ]


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    author = ProfileDetailSerializer(read_only=True)
    categories = CategoryListSerializer(read_only=True, many=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'body',
            'categories',
            'creation_date',
            'author',
        ]


class BlogListSerializer(serializers.ModelSerializer):
    author = ProfileListSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'creation_date',
            'author',
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    blogs = BlogListSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
            'blogs',
        ]

class NavbarPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'title',
            'slug',
        ]


class NavbarSerializer(serializers.ModelSerializer):
    pages = serializers.SerializerMethodField('get_nav_pages')
    #pages = NavbarPageSerializer(many=True, read_only=True, required=False)

    title = serializers.SerializerMethodField('get_nav_title')
    slug = serializers.SerializerMethodField('get_nav_slug')
    class Meta:
        model = Section
        fields = [
            'title',
            'slug',
            'pages',
        ]
    def to_representation(self, instance):
        result = super(NavbarSerializer, self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])

    def get_nav_title(self, obj):
        return obj.nav_title()

    def get_nav_slug(self, obj):
        return obj.nav_slug()

    def get_nav_pages(self, obj):
        if obj.not_dropdown():
            return None
        else:
            return NavbarPageSerializer(obj.nav_pages(), many=True).data
