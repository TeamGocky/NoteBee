from django.conf.urls import patterns, url
from registration.views import *

urlpatterns = patterns('',
    url(r'^$', register, name="root"),
    url(r'^register/$', register, name="register"),
)
