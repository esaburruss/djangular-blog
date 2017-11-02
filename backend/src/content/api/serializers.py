import re
from collections import OrderedDict

from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject

from drf_img_crop.serializers import ImageCreateSerializer

from core.models import Profile
from core.api.serializers import ProfileDetailSerializer, ProfileListSerializer

from jinja2 import Environment, BaseLoader

#from drf_hateoas.fields import HateoasUrlField
from drf_hateoas.serializers import HateoasSerializer
from ..models import Blog, Category, Page, Section, HtmlContent, ContentImage
from .validators import TitleValidator

CONTENT_FIELDS = [
        'pk',
        'title',
        'slug',
        'is_visible',
        'creation_date',
        'changed_date',
    ]

HTML_CONTENT_FIELDS = CONTENT_FIELDS + [
        'body',
        'images',
    ]

BASE_KWARGS = {
    'pk': {'read_only': True},
    'slug': {'read_only': True},
    'creation_date': {'read_only': True},
    'changed_date': {'read_only': True},
}

READ_ONLY_KWARGS = {**BASE_KWARGS, **{'title': {'read_only': True}}}

CONTENT_FIELDS_KWARGS = {**BASE_KWARGS, **{'title': {'required': True}}}

BASE_PATH = '/api/content/'

URLS = {
    'page': BASE_PATH + 'page',
    'section': BASE_PATH + 'section',
    'category': BASE_PATH + 'category',
    'blog': BASE_PATH + 'blog',
    'image': BASE_PATH + 'image',
}

def GET_CONTENT_FIELDS_KWARGS(queryset):
    return {**BASE_KWARGS, **{'title': {'required': True, 'validators':[TitleValidator(queryset=queryset)]}}}

#SLUG_REGEX = re.compile('^(\w+)$')

class BaseListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = CONTENT_FIELDS
        extra_kwargs = READ_ONLY_KWARGS

class PageListSerializer(BaseListSerializer):
    class Meta(BaseListSerializer.Meta):
        model = Page

class ContentImageListSerializer(BaseListSerializer):
    class Meta(BaseListSerializer.Meta):
        model = ContentImage

class SectionSerializer(serializers.ModelSerializer):
    #pages = HateoasUrlField(read_only=True)#PageListSerializer(read_only=True, many=True)
    class Meta:
        model = Section
        fields = CONTENT_FIELDS + ['pages']
        extra_kwargs = GET_CONTENT_FIELDS_KWARGS(queryset=model.objects.all())


class BlogListSerializer(serializers.ModelSerializer):
    author = ProfileListSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = CONTENT_FIELDS + ['Author']
        extra_kwargs = GET_CONTENT_FIELDS_KWARGS(queryset=model.objects.all())


class CategorySerializer(serializers.ModelSerializer):
    blogs = BlogListSerializer(many=True, read_only=True)
    class Meta:
        model = Blog
        fields = CONTENT_FIELDS + ['blogs']
        extra_kwargs = GET_CONTENT_FIELDS_KWARGS(queryset=model.objects.all())



class ContentImageSerializer(serializers.ModelSerializer):
    pages = PageListSerializer(read_only=True, many=True)
    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'pk',
            'pages',
            'image',
        ]
        extra_kwargs = {
            'image': {'read_only': True},
            'pk': {'read_only': True},
        }

class PageSerializer(HateoasSerializer):
    #images = ContentImageSerializer(many=True, read_only=True)
    #section = SectionSerializer(read_only=True)
    section = serializers.SerializerMethodField()
    path = URLS['page']
    def create(self, validated_data):
        if self.context['section'] is not None:
            validated_data['section'] = self.context['section']
        return super().create(validated_data)

    class Meta:
        model = Page
        fields = CONTENT_FIELDS + [
            'body',
            #'section_url',
            #'images',
            'section',
        ]
        extra_kwargs = GET_CONTENT_FIELDS_KWARGS(queryset=model.objects.all())

    def get_section(self, obj):
        return self.get_hateoas_url('Section', URLS['section'], is_parent=True, pk=2)

class ContentImageCreateSerializer(ImageCreateSerializer):

    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'image',
            'crop',
        ]
        extra_kwargs = {**{
            'image': {'required': True},
        }, **GET_CONTENT_FIELDS_KWARGS(queryset=model.objects.all())}


class HtmlPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    class Meta:
        model = Page
        fields = [
            'body',
        ]

    def get_body(self, obj):
        templateVars = {}
        for img in obj.images.all():
            templateVars['img__' + str(img.slug)] = '<img src="' + img.image.url +'" />'
        rtemplate = Environment(loader=BaseLoader()).from_string(obj.body)
        return rtemplate.render(templateVars)

class HtmlBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'body',
            'categories',
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
    images = ContentImageSerializer(many=True)
    categories = CategoryListSerializer(read_only=False, many=True)
    class Meta:
        model = Blog
        fields = HTML_CONTENT_FIELDS + [
            'categories',
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
