from django.conf.urls import patterns, include, url
from mysite.views import *

urlpatterns = patterns('',
    (r'^$', homepage),
    (r'^time/?$', current_datetime),
    (r'^time/plus/(\d{1,2})/?$', hours_ahead),
)
