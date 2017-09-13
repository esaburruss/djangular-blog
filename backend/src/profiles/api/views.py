from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse

def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(username)
    print(password)
    return JsonResponse({'login':0})
