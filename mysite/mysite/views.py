from django.http import Http404
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.models import User

import datetime

def homepage(request):
	return render_to_response('home.html',
                                  context_instance=RequestContext(request));

def current_datetime(request):
	now = datetime.datetime.now()
	return render_to_response('current_datetime.html',
                                  {'current_date' : now},
			    context_instance=RequestContext(request))

def hours_ahead(request, offset):
	try:
		offset = int(offset)
	except ValueError:
		raise Http404()
	dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
	return render_to_response('hours_ahead.html',
                                  {'hour_offset' : offset,
				   'next_time': dt},
			       context_instance=RequestContext(request))

def display_meta(request):
        values = request.META.items()
        values.sort()
        return render_to_response('html_headers.html',
				  {'headers' : values},
			       context_instance=RequestContext(request))
def codemirror(request):
    context = RequestContext(request)
    modes = ["clike/clike"]
    return render_to_response('codemirror.html', {'modes' : modes},
			      context_instance=context)
