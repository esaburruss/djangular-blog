import json
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

def login_user(request):
    x = json.loads(request.body.decode('utf-8'))
    username = x['username']
    password = x['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'login':1})
    return JsonResponse({'login':0})

def logout_user(request):
    logout(request)
    return JsonResponse({'login':0})
