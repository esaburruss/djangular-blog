"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from .views import login_user
from django.views.generic.base import TemplateView
from content.api.views import BlogListAPIView, PageViewSet
from rest_framework import routers

router = routers.SimpleRouter()

router.register(r'page', PageViewSet)

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + router.urls + [
    #url(r'^hateoas/$', PageViewSet.as_view({'get': 'list'})),
    #url(r'^hateoas/(?P<pk>[0-9]+)/$', PageViewSet.as_view({'get': 'detail'})),
    url(r'^admin/', admin.site.urls),
    url(r'^api/auth/login', login_user),
    url(r'^api/content/', include("content.api.urls", namespace='content-api')),
    url(r'^dashboard/*', TemplateView.as_view(template_name="dashboard.html"), name='dashboard'),
    #url(r'^.*', TemplateView.as_view(template_name="home.html"), name='home'),
]
