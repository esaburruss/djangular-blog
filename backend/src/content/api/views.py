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
        UpdateAPIView,
        RetrieveAPIView,
        RetrieveUpdateAPIView,
    )
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated,
        IsAdminUser,
        IsAuthenticatedOrReadOnly,
    )
from ..models import Blog, Category, Page, Section

from .pagination import BlogLimitOffsetPagination, BlogPageNumberPagination
from .permissions import IsOwnerOrReadOnly

from .serializers import (
        HtmlPageSerializer,
        BlogDetailSerializer,
        BlogListSerializer,
        CategoryDetailSerializer,
        CategoryListSerializer,
        PageDetailSerializer,
        PageListSerializer,
        NavbarSerializer,
        ContentImageSerializer,
    )

@parser_classes((MultiPartParser, FileUploadParser,))
class PageAPIView(APIView):
    def get(self, request, format=None):
        pages = Page.objects.all()
        serializer = PageListSerializer(pages, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PageDetailSerializer(data=request.data)
        print(request.FILES['image0'])
        return Response('To-Do')

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
