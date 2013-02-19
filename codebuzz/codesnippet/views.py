from random import randint, seed

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from codesnippet.forms import SnippetForm
from codesnippet.models import Snippet, SnippetRating

def index(request):
    """Homepage for codesnippet application."""
    context = RequestContext(request)
    if request.method == "POST":
        form = SnippetForm(data = request.POST)
        if form.is_valid():
            # Redirect to the view page for the snippet.
            snippet = form.save(commit=False)
            if request.user.is_authenticated():
                snippet.user = request.user
            snippet.save()
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
    try:
        snippet = Snippet.objects.get(id=sid)
        ratings = SnippetRating.objects.filter(snippet=sid)
        total_rating = 0.0
        if len(ratings) > 0:
            total_rating = sum(ratings) / len(ratings)
        return render_to_response("codesnippet/view_snippet.html",
                              {"snippet" : snippet,
                               "rating" : total_rating},
                              context)
    except ObjectDoesNotExist:
        errors = ["Snippet does not exist"]
        return render_to_response("codesnippet/view_snippet.html",
                                  {"errors" : errors},
                                  context)

def view_random_snippet(request):
    """Select a random snippet for the database to view."""
    snippets = Snippet.objects.all()
    if len(snippets) == 0:
        return view_snippet(request, -1)
    else:
        index = randint(0, len(snippets)-1)
        snippet = snippets[index]
        return view_snippet(request, snippet.id)

"""Dummy view just so I could see what my page looked like."""
def view_top_snippets(request):
	context = RequestContext(request)
	return render_to_response("codesnippet/top_snippets.html", context)

"""Dummy view just so I could see what my page looked like."""
def browser_snippets(request):
	context = RequestContext(request)
	return render_to_response("codesnippet/browse_snippets.html", context)
