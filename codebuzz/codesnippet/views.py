from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from codesnippet.forms import SnippetForm
from codesnippet.models import Snippet

def index(request):
    context = RequestContext(request)
    if request.method == "POST":
        form = SnippetForm(data = request.POST)
        if form.is_valid():
            snippet = form.save()
            view = "view/{}/".format(snippet.id)
            return HttpResponseRedirect(view)
        else:
            print form.errors
    else:
        form = SnippetForm()
    return render_to_response('index.html', {"form" : form}, context) 

def view_snippet(request, sid):
    context = RequestContext(request)
    snippet = Snippet.objects.get(id=sid)
    return render_to_response("view_snippet.html", {"snippet" : snippet},
                              context)
