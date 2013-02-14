from django import forms
from django.template import RequestContext
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response


# Create your views here.
def register(request):
    context = RequestContext(request)
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return render_to_response('register.html', {'user' : user})
    else:
        form = UserCreationForm()
    return render_to_response('register.html', {'form' : form},
                              context)
