from django.http import Http404
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.models import User
from rango.models import UserProfile
from rango.models import UserForm, UserProfileForm


import datetime

def homepage(request):
	return render_to_response('home.html',
                                  context_instance=RequestContext(request));

def current_datetime(request):
	now = datetime.datetime.now()
	return render_to_response('current_datetime.html',
                                  {'current_date' : now})

def hours_ahead(request, offset):
	try:
		offset = int(offset)
	except ValueError:
		raise Http404()
	dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
	return render_to_response('hours_ahead.html',
                                  {'hour_offset' : offset, 'next_time': dt})

def display_meta(request):
        values = request.META.items()
        values.sort()
        return render_to_response('html_headers.html', {'headers' : values})

def register(request):
        context = RequestContext(request)
        registered = False
        user = None
        if request.method == 'POST':
            uform = UserForm(data = request.POST)
            pform = UserProfileForm(data = request.POST)
            if uform.is_valid() and pform.is_valid():
                user = uform.save()
                profile = pform.save(commit = False)
                profile.user = user
                profile.save()
                registered = True
            else:
                print uform.errors, pform.errors
        else:
            uform = UserForm()
            pform = UserProfileForm()
            
        return render_to_response('rango/register.html',
                                  {'uform': uform, 'pform': pform,
                                   'registered': registered,
                                   'user' : user}, context)
