from django.conf.urls import patterns, url
from mysite.books.views import *

urlpatterns = patterns('',
    (r'^$', hello),
    (r'^meta/$', display_meta),
    (r'^search-form/$', search_form),
    (r'^search/$', search),
    (r'^book-details/(?P<identifier>\d+)/$', book_details),
    url(r'^register/$', register, name='registration'),
    url(r'^login/$', user_login, name='login'),
    url(r'^logout/$', user_logout, name='logout'),
)
