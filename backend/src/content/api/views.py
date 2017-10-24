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
    )
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FileUploadParser, JSONParser, FormParser
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated,
        IsAdminUser,
        IsAuthenticatedOrReadOnly,
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
        SectionDetailSerializer,
        PageDetailSerializer,
        PageListSerializer,
        NavbarSerializer,
        ContentImageSerializer,
        ContentImageCreateSerializer,
    )

@parser_classes((FormParser, MultiPartParser, JSONParser,))
class ContentImageAPIView(ListCreateAPIView):
    serializer_class = ContentImageSerializer

    def get_queryset(self):
        pages = ContentImage.objects.filter(page__slug=self.kwargs['slug'])
        return pages

    def page(self, slug):
        page = Page.objects.filter(slug=slug)

        if page is None:
            raise NotFound('Page Not Found')
        return page

    def get_serializer_context(self):
        print(self.request.data)
        return {
            'page': self.page(self.kwargs['slug']),
            #'json': self.request.data['json'],
        }

    def post(self, request, *args, **kwargs):
        page = Page.objects.get(slug=kwargs['slug'])
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

    serializer_class = PageDetailSerializer

    def get_queryset(self):
        pages = Page.objects.filter(section__slug=self.kwargs['slug'])
        return pages

    def section(self, slug):
        print(slug)
        section = Section.objects.get(slug=slug)

        if section is None:
            raise NotFound('Section Not Found')
        return section

    def get_serializer_context(self):
        return {
            'section': self.section(self.kwargs['slug'])
        }

@parser_classes((MultiPartParser, ))
class PageAPIDetailView(APIView):

    def get_object(self, pk):
        try:
            return Page.objects.get(pk=pk)
        except Page.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        page = self.get_object(pk)
        serializer = PageDetailSerializer(page)
        return Response(serializer.data)


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


class NavbarAPIView(ListAPIView):
    queryset = Section.objects.filter(is_visible=True)
    serializer_class = NavbarSerializer
    #filter_backends= [SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
