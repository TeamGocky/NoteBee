from django.conf.urls import patterns, url
from accounts.views import *

urlpatterns = patterns('',
    url(r'^login/$', user_login, name="login"),
    url(r'^logout/$', user_logout, name="logout"),
)
