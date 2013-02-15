from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

def register(request):
    # Context necessary for csrf token in form.
    context = RequestContext(request)
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return HttpResponseRedirect("/codesnippet/")
    else:
        form = UserCreationForm()
    return render_to_response("register.html", {"form" : form},
                              context)

