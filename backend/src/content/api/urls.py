from django.conf.urls import url
from django.contrib import admin

from .views import (
    get_home_page,
    get_nav,
    BlogDetailAPIView,
    BlogListAPIView,
    PageHtmlAPIView,
    CategoryListAPIView,
    NavbarAPIView,
    )

urlpatterns = [
    url(r'^home/$', get_home_page, name='home'),
    url(r'^navbar/$', get_nav, name='nav'),
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    url(r'^page/(?P<slug>[\w-]+)/$', PageHtmlAPIView.as_view(), name='detail'),
]
