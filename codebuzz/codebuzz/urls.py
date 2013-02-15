from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^codesnippet/', include("codesnippet.urls")),
    # Examples:
    # url(r'^$', 'codebuzz.views.home', name='home'),
    # url(r'^codebuzz/', include('codebuzz.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
