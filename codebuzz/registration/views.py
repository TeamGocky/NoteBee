from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from codesnippet.views import getLatestSnippets
try:
	import twitter
	twitterSuccess = True
except:
    print 'Twitter could not be imported'
    twitterSuccess = False

def register(request):
    # Context necessary for csrf token in form.
    context = RequestContext(request)
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            if twitterSuccess:
                try:
                    api = twitter.Api(consumer_key='0aIAx6JBFjCRsVo2I6m5VQ', consumer_secret='ezaCJZNLJtTRaIogVvv08u3thnwSTtDMHmRMMs7lyk', access_token_key='1219662349-DJfNG23p2NLME6VAQv02gGNJXLiVQ1r99upKB0k', access_token_secret='P806WM9qbwg81Q1lGsVvRZ1Xl3PACurSmL1BWqCHgg')
                    api.PostUpdate('Please welcome our new user "' + user.username + '" to our website!')
                except:
                    print 'Twitter posting for new user failed.'
            msg = "Successfully registered, please login."
            return render_to_response("register.html", {"msg" : msg,
                "latestSnippets" : getLatestSnippets()}, context)
    else:
        form = UserCreationForm()
    return render_to_response("register.html", {"form" : form,
                "latestSnippets" : getLatestSnippets()}, context)