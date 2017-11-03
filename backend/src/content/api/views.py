from django.http import HttpResponse, JsonResponse
from django.db.models import Q
from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
        CreateAPIView,
        DestroyAPIView,
        ListAPIView,
        ListCreateAPIView,
        UpdateAPIView,
        RetrieveAPIView,
        RetrieveUpdateAPIView,
        RetrieveUpdateDestroyAPIView,
    )
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FileUploadParser, JSONParser, FormParser
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated,
        IsAdminUser,
        IsAuthenticatedOrReadOnly,
    )
import jinja2

from rest_framework_extensions.mixins import NestedViewSetMixin

from drf_hateoas.pagination import ExtraLinksAwarePageNumberPagination
from drf_hateoas.viewsets import HateoasViewSet, HateoasModelViewSet
from drf_hateoas.mixins import (
        HateoasListMixin,
        HateoasRetrieveMixin,
        HateoasUpdateMixin,
        HateoasCreateMixin,
        HateoasDestroyMixin
    )

from drf_hateoas import viewsets, mixins, pagination

from ..models import Blog, Category, Page, Section, ContentImage

from .pagination import BlogLimitOffsetPagination, BlogPageNumberPagination
from .permissions import IsOwnerOrReadOnly

from .serializers import (
        HtmlPageSerializer,
        BlogDetailSerializer,
        BlogListSerializer,
        CategoryDetailSerializer,
        CategoryListSerializer,
        SectionSerializer,
        PageSerializer,
        PageListSerializer,
        NavbarSerializer,
        ContentImageSerializer,
        ContentImageListSerializer,
        ContentImageCreateSerializer,
    )

BASE_PATH = '/api/content'
class SectionModelViewSet(HateoasModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()

class SectionRUDAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    lookup_fields = ('pk',)

class PageLCAPIView(ListCreateAPIView):
    serializer_class = PageSerializer
    queryset = Page.objects.all()

class PageRUDAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PageSerializer
    queryset = Page.objects.all()
    lookup_fields = ('pk',)

@parser_classes((FormParser, MultiPartParser,))
class ContentImageAPIView(CreateAPIView):
    serializer_class = ContentImageSerializer

    def get_serializer_context(self):
        return {
            'page': self.page(self.kwargs['pk']),
        }

    def post(self, request, *args, **kwargs):
        page = Page.objects.get(pk=kwargs['pk'])
        if page is not None:
            if 'image' in request.data:
                image = ContentImageCreateSerializer(data=request.data)
                if image.is_valid():
                    img = image.save()
                    page.images.add(img)
                    page.save()
                    return JsonResponse(image.data, status=201)
                else:
                    return JsonResponse(image.errors, status=400)
            else:
                return JsonResponse('Image File not included in request', status=400)
        else:
            return JsonResponse('Page Not Found', status=404)

class PageViewSet(HateoasModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    list_serializer_class = PageListSerializer

class PageInSectionAPIView(NestedViewSetMixin, HateoasViewSet,
        HateoasCreateMixin, HateoasListMixin):

    serializer_class = PageSerializer
    list_serializer_class = PageListSerializer

    def get_queryset(self):
        pages = Page.objects.filter(section__pk=self.kwargs['parent_lookup_section_id'])
        return pages

    def section(self, pk):
        section = Section.objects.get(pk=pk)

        if section is None:
            raise NotFound('Section Not Found')
        return section

    def get_serializer_context(self):
        context = super(PageInSectionAPIView, self).get_serializer_context()
        context['section'] = self.section(self.kwargs['parent_lookup_section_id'])
        return context

'''class PageAPIDetailView(APIView):

    def get_object(self, pk):
        try:
            return Page.objects.get(pk=pk)
        except Page.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        page = self.get_object(pk)
        serializer = PageDetailSerializer(page)
        return Response(serializer.data)'''


class PageHtmlAPIView(RetrieveAPIView):
    queryset = Page.objects.filter(is_visible=True)
    serializer_class = HtmlPageSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "abc"


@api_view(['GET'])
@permission_classes((AllowAny, ))
def get_nav(request):
    home = Page.objects.get(is_home=True)
    nav = Section.objects.filter(is_visible=True)
    blogs = Blog.objects.filter(is_visible=True)
    categories = Category.objects.filter(is_visible=True)

    return Response({
        'navbar':{'home':PageDetailSerializer(home).data,
        'navitems':NavbarSerializer(nav, many=True).data},
        'blogs':BlogListSerializer(blogs, many=True).data,
        'categories':CategoryListSerializer(categories, many=True).data
    })


@api_view(['GET'])
@permission_classes((AllowAny, ))
def get_home_page(request):
    p = Page.objects.get(is_home=True)
    return Response(HtmlPageSerializer(p).data)


class BlogDetailAPIView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "abc"

class BlogListAPIView(ListAPIView):
    serializer_class = BlogListSerializer
    filter_backends= [SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    search_fields = ['title', 'body']
    pagination_class = BlogPageNumberPagination #PageNumberPagination

    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = Blog.objects.all() #filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                    Q(title__icontains=query)|
                    Q(content__icontains=query)|
                    Q(user__first_name__icontains=query) |
                    Q(user__last_name__icontains=query)
                    ).distinct()
        return queryset_list

class CategoryDetailAPIView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "abc"

class CategoryListAPIView(ListAPIView):
    serializer_class = CategoryListSerializer
    filter_backends= [SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    search_fields = ['slug']
    pagination_class = BlogPageNumberPagination #PageNumberPagination

    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = Category.objects.all() #filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                    Q(title__icontains=query)|
                    Q(content__icontains=query)|
                    Q(user__first_name__icontains=query) |
                    Q(user__last_name__icontains=query)
                    ).distinct()
        return queryset_list


@parser_classes((FormParser, MultiPartParser,JSONParser))
class ContentImageAPIView(HateoasCreateMixin):
    serializer_class = ContentImageSerializer

    def get_serializer_context(self):
        return super().get_serializer_context()#{'page': self.page(self.kwargs['pk'])}

    def post(self, request, *args, **kwargs):
        page = Page.objects.get(pk=request.POST.get('page'))
        if page is not None:
            if 'image' in request.data:
                image = ContentImageCreateSerializer(data=request.data)
                if image.is_valid():
                    img = image.save()
                    page.images.add(img)
                    page.save()
                    return JsonResponse(image.data, status=201)
                else:
                    return JsonResponse(image.errors, status=400)
            else:
                return JsonResponse('Image File not included in request', status=400)
        else:
            return JsonResponse('Page Not Found', status=404)

'''class HtmlContentImageList(HateoasViewSet, ):
    serializer_class = ContentImageListSerializer
    filter_backends= [SearchFilter, OrderingFilter]
    #queryset = ContentImage.objects.all()
    #permission_classes = [AllowAny]
    #search_fields = ['slug']
    #pagination_class = BlogPageNumberPagination #PageNumberPagination
    def get_list_serializer(self):
        return ContentImageListSerializer

    def get_detail_serializer(self):
        return Content

    def get_object_name(self):
        return ''

    def get_parent_namespace(self):
        return ''

    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = None #filter(user=self.request.user)
        #query = self.request.GET.get("q")
        page = self.request.GET.get("page")
        blog = self.request.GET.get("blog")
        if page:
            queryset_list = ContentImage.objects.filter(Q(page__pk=page))
        elif blog:
            queryset_list = ContentImage.objects.filter(Q(blog__pk=blog))
        else:
            queryset_list = ContentImage.objects.all()
        return queryset_list'''

@parser_classes((FormParser, MultiPartParser,JSONParser))
class HtmlContentImageList(
        HateoasViewSet,
        HateoasListMixin,
        HateoasRetrieveMixin,
        HateoasUpdateMixin,
        ContentImageAPIView,
        HateoasDestroyMixin):
    serializer_class = ContentImageListSerializer
    create_serializer_class = ContentImageCreateSerializer

    filter_backends= [SearchFilter, OrderingFilter]
    queryset = ContentImage.objects.all()
    #permission_classes = [AllowAny]
    #search_fields = ['slug']
    #pagination_class = BlogPageNumberPagination #PageNumberPagination


    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        queryset_list = None #filter(user=self.request.user)
        #query = self.request.GET.get("q")
        page = self.request.GET.get("page")
        blog = self.request.GET.get("blog")
        if page:
            queryset_list = ContentImage.objects.filter(Q(page__pk=page))
        elif blog:
            queryset_list = ContentImage.objects.filter(Q(blog__pk=blog))
        else:
            queryset_list = ContentImage.objects.all()
        return queryset_list
