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
        PageInSectionAPIView,
        PageAPIDetailView,
        ContentImageAPIView,
    )

urlpatterns = [
    url(r'^home/$', get_home_page, name='home'),
    url(r'^nav/$', get_nav, name='nav'),
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    url(r'^page/(?P<slug>[\w-]+)/$', PageHtmlAPIView.as_view(), name='detail'),
    url(r'^category/(?P<slug>[\w-]+)/page/$', PageInSectionAPIView.as_view()),
    url(r'^page/(?P<slug>[\w-]+)/image/$', ContentImageAPIView.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', PageAPIDetailView.as_view()),
    #url(r'^snippets/$', PageAPIView.as_view()),
    #url(r'^snippets/(?P<pk>[0-9]+)/image/$', ContentImageAPIView.as_view()),
]
