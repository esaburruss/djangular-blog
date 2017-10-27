from django.conf.urls import url, include
from django.contrib import admin

from rest_framework import routers

from .views import (
        get_home_page,
        get_nav,
        BlogDetailAPIView,
        BlogListAPIView,
        CategoryListAPIView,
        PageHtmlAPIView,
        SectionModelViewSet,
        PageLCAPIView,
        PageRUDAPIView,
        PageInSectionAPIView,
        ContentImageAPIView,
        PageViewSet,
        HtmlContentImageList,
    )

routerPage = routers.SimpleRouter()
routerPage.register(r'page', PageViewSet)

routerImg = routers.SimpleRouter()
routerImg.register(r'image', HtmlContentImageList)

routerSection = routers.SimpleRouter()
routerSection.register(r'section', SectionModelViewSet)

urlpatterns = [
    #Public
    url(r'^home/$', get_home_page, name='home'),
    url(r'^nav/$', get_nav, name='nav'),
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    #url(r'^page/(?P<slug>[\w-]+)/$', PageHtmlAPIView.as_view(), name='detail'),
    #Admin/Protected
    #url(r'^section/$', SectionLCAPIView.as_view()),
    #url(r'^section/(?P<pk>[0-9]+)/$', SectionRUDAPIView.as_view()),
    #url(r'^section/(?P<pk>[0-9]+)/page/$', PageInSectionAPIView.as_view()),
    #url(r'^page/$', PageLCAPIView.as_view()),
    #url(r'^page/(?P<pk>[0-9]+)/$', PageRUDAPIView.as_view()),
    #url(r'^page/(?P<pk>[0-9]+)/', include(router2.urls)),
    #url(r'^page/(?P<pk>[0-9]+)/image/$', ContentImageAPIView.as_view()),
] + routerPage.urls + routerImg.urls + routerSection.urls
