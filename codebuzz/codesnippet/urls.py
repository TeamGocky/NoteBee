from django.conf.urls import patterns, include, url
from codesnippet.views import *

urlpatterns = patterns('',
    url(r'^$', index, name="root"),
    url(r'^index/$', index, name="index"),
    url(r'^view/(?P<sid>\d+)/$', view_snippet, name="view"),
    url(r'^random/$', view_random_snippet, name="random"),
    url(r'^top/$', view_top_snippets, name="top"),
    url(r'^browse/$', browser_snippets, name="browse"),

)
