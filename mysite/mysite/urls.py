from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()
import mysite
from mysite.views import *

urlpatterns = patterns('',
    (r'^$', homepage),
    (r'^admin/', include(admin.site.urls)),
    (r'^books/', include('mysite.books.urls')),
    (r'^time/$', current_datetime),
    (r'^time/plus/(\d{1,2})/$', hours_ahead),
)
