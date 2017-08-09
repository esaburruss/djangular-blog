from django.conf.urls import url
from django.contrib import admin

from .views import (
    BlogDetailAPIView,
    BlogListAPIView,
    CategoryDetailAPIView,
    CategoryListAPIView,
    NavbarAPIView,
    )

urlpatterns = [
    url(r'^navbar/$', NavbarAPIView.as_view(), name='list'),
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    url(r'^category/(?P<slug>[\w-]+)/$', CategoryDetailAPIView.as_view(), name='detail'),
]
