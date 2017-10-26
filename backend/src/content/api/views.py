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

from drf_hateoas_base.views import (
        HateoasListView,
        HateoasRetrieveView,
        HateoasUpdateView,
        HateoasCreateView,
        HateoasDestroyView,
        create_link,
        ExtraLinksAwarePageNumberPagination,
    )

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
        ContentImageCreateSerializer,
    )

class SectionLCAPIView(ListCreateAPIView):
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
        print(self.request.data)
        return {
            'page': self.page(self.kwargs['pk']),
        }

    def post(self, request, *args, **kwargs):
        page = Page.objects.get(pk=kwargs['pk'])
        if page is not None:
            if 'image' in request.data:
                print(request.data)
                image = ContentImageCreateSerializer(data=request.data)
                print(image)
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


class PageInSectionAPIView(ListCreateAPIView):

    serializer_class = PageSerializer

    def get_queryset(self):
        pages = Page.objects.filter(section__pk=self.kwargs['pk'])
        return pages

    def section(self, pk):
        section = Section.objects.get(pk=pk)

        if section is None:
            raise NotFound('Section Not Found')
        return section

    def get_serializer_context(self):
        return {
            'section': self.section(self.kwargs['pk'])
        }

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

class PageViewSet(HateoasListView, HateoasRetrieveView, HateoasUpdateView, HateoasCreateView,
                  HateoasDestroyView):
    queryset = Page.objects.all()
    #serializer_class = PageSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return PageListSerializer
        return PageSerializer

    def get_list_links(self, request):
        return [
            {
                'desc': 'Self',
                'href': request.build_absolute_uri(request.path),
                'method': 'GET',
            },
            {
                'desc': 'New Page',
                'href': request.build_absolute_uri(request.path),
                'method': 'POST'
            }
        ]

    def linkify_list_data(self, request, data):
        for page in data:
            detail_link = request.build_absolute_uri(reverse('page-detail', kwargs={'pk': page['pk']}))
            page['_links'] = [
                create_link('Page detail', detail_link, 'GET'),
            ]
        return data

    def get_retrieve_links(self, request, instance):
        self_link = request.build_absolute_uri(request.path)
        #image_link = request.build_absolute_uri(reverse('page-images-list', kwargs={'page_pk': instance.pk}))
        #memberlist_link = request.build_absolute_uri(reverse('band-members-list', kwargs={'page_pk': instance.pk}))

        return [
            create_link('Self', self_link, 'GET'),
            create_link('Update self', self_link, 'PUT'),
            create_link('Delete self', self_link, 'DELETE'),
            #create_link('List of images', image_link, 'GET'),
            #create_link('Add new image', image_link, 'POST'),
            #create_link('List of members', memberlist_link, 'GET'),
            #create_link('Add new member', memberlist_link, 'POST')
        ]

    def get_create_links(self, request, data):
        detail_link = request.build_absolute_uri(reverse('page-detail', kwargs={'pk': data['pk']}))

        return [
            create_link('Detail of page', detail_link, 'GET')
        ]

    def get_update_links(self, request, instance):
        detail_link = request.build_absolute_uri(reverse('page-detail', kwargs={'pk': instance.pk}))

        return [
            create_link('Detail of page', detail_link, 'GET')
       ]
