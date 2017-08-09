from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination,
    )

class BlogLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10

class BlogPageNumberPagination(PageNumberPagination):
    page_size = 20
