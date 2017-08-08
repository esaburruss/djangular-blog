from ..models import Page, Section
from rest_framework import serializers

class PageDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Page
        fields = [
            'title',
            'slug',
            'body',
            'posted',
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
            'posted',
            'author',
        ]

class CategoryDetailSerializer(serializers.ModelSerializer):
    #blogs = serializers.SerializerMethodField()
    #blogs = BlogListSerializer(read_only=True)
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
            #'blogs',
        ]
    '''def get_blogs(self, obj, *args, **kwargs):
        serializer = BlogListSerializer(Blog.objects.filter(categories=obj.pk))
        print(serializer)
        return serializer.data'''



class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]
