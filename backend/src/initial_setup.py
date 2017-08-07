
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
#from django.conf import settings
import django
django.setup()
from django.contrib.auth.models import User
from profiles.models import Profile

u = User(
    username='esaburruss',
    first_name='Edward',
    last_name='Burruss',
    email='edward@esaburruss.com'
)
u.set_password('p@ssword')
u.is_superuser = True
u.is_staff = True
u.save()

p = Profile(
    user=u,
    picture='Headshot.jpg',
    facebook='BudBurruss',
    twitter='esaburruss',
    instagram='budburruss',
    github='esaburruss'
)
p.save()
