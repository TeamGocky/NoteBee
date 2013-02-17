from random import randint, seed

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from codesnippet.forms import SnippetForm
from codesnippet.models import Snippet

def index(request):
    """Homepage for codesnippet application."""
    context = RequestContext(request)
    if request.method == "POST":
        form = SnippetForm(data = request.POST)
        if form.is_valid():
            # Redirect to the view page for the snippet.
            snippet = form.save()
            view = "view/{}/".format(snippet.id)
            return HttpResponseRedirect(view)
        else:
            print form.errors
    else:
        form = SnippetForm()
    return render_to_response('index.html', {"form" : form}, context) 

def view_snippet(request, sid):
    """View the snippet with id = sid argument."""
    context = RequestContext(request)
    snippet = Snippet.objects.get(id=sid)
    return render_to_response("codesnippet/view_snippet.html",
                              {"snippet" : snippet},
                              context)

def view_random_snippet(request):
    """Select a random snippet for the database to view."""
    while True:
        try:
            rid = randint(1, Snippet.objects.latest("id").id)
            # Try and get the snippet (will raise exception if not there).
            snippet = Snippet.objects.get(id=rid)
            break
        except ObjectDoesNotExist:
            continue
    return view_snippet(request, rid)

"""Dummy view just so I could see what my page looked like."""
def view_top_snippets(request):
	context = RequestContext(request)
	return render_to_response("codesnippet/top_snippets.html", context)

"""Dummy view just so I could see what my page looked like."""
def browser_snippets(request):
	context = RequestContext(request)
	return render_to_response("codesnippet/browse_snippets.html", context)