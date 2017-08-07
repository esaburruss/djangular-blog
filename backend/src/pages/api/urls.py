from django.conf.urls import url
from django.contrib import admin

from .views import (
    BlogDetailAPIView,
    BlogListAPIView,
    CategoryDetailAPIView,
    CategoryListAPIView,
    )

urlpatterns = [
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    url(r'^category/(?P<name_slug>[\w-]+)/$', CategoryDetailAPIView.as_view(), name='detail'),
]
