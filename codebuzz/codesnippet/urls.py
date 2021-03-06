from django.conf.urls import patterns, include, url
from codesnippet.views import *

urlpatterns = patterns('',
    url(r'^$', index, name="root"),
    url(r'^index/$', index, name="index"),
    url(r'^view/(?P<sid>\d+)/$', view_snippet, name="view"),
    url(r'^random/$', view_random_snippet, name="random"),
    url(r'^browse/$', browser_snippets, name="browse"),
    url(r'^browse/language/(?P<language>[^/]+)/$', browse_language),
    url(r'^browse/category/(?P<category>[^/]+)/$', browse_category),
    url(r'^rating/(?P<sid>\d+)/$', submit_rating, name="rating"),
    url(r'^bookmark/(?P<sid>\d+)/$', bookmark_snippet, name="bookmark"),
    url(r'^comment/(?P<sid>\d+)/$', submit_comment, name="comment"),
    url(r'^search/$', search_snippet, name="search"),
    url(r'^advanced_search/$', advanced_search, name="advanced"),
)
