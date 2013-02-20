from random import randint, seed

from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from codesnippet.forms import SnippetForm, SnippetRatingForm,\
                              SnippetSearchForm
from codesnippet.models import Snippet, SnippetRating

def getLatestSnippets():
    return Snippet.objects.all().order_by("-id")[:5]

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
    return render_to_response('index.html', {"form" : form,
                               "latestSnippets" : getLatestSnippets()}, context)

def get_rating(request, snippet):
    """Retrieve the rating of the snippet by request user.
    
    Returns None if no such rating exists otherwise returns the rating.
    """
    initial = None
    # Select the initial rating to be the users last submitted
    # rating for the snippet, if there is one.
    if request.user.is_authenticated():
        try:
            
            initial = SnippetRating.objects.get(snippet=snippet,
                                                user=request.user)
        except ObjectDoesNotExist:
            return None
    if initial is None:
        return None
    return initial.rating

def view_snippet(request, sid, errors=[]):
    """View the snippet with id = sid argument."""
    context = RequestContext(request)
    try:
        snippet = Snippet.objects.get(id=sid)
        ratings = SnippetRating.objects.filter(snippet=sid)
        # Set selected rating to the submitted rating for this user
        initial = get_rating(request, snippet)
        if initial is None:
            initial = 1
        rform = SnippetRatingForm(initial={"rating" : int(initial)})
        total_rating = 0.0
        if len(ratings) > 0:
            for r in ratings:
                total_rating += r.rating
            total_rating = total_rating / len(ratings)
        return render_to_response("codesnippet/view_snippet.html",
                              {"snippet" : snippet,
                               "rating" : total_rating,
                               "rating_form" : rform,
                               "errors" : errors,
                               "latestSnippets" : getLatestSnippets()},
                              context)
    except ObjectDoesNotExist:
        errors += ["Snippet does not exist"]
        return render_to_response("codesnippet/view_snippet.html",
                                  {"errors" : errors,
                               "latestSnippets" : getLatestSnippets()},
                                  context)

@login_required
def submit_rating(request, sid):
    """Submits a user rating of a snippet."""
    context = RequestContext(request)
    errors = []
    if request.method == "POST":
        try:
            urating = int(request.POST["rating"])
        except ValueError:
            errors += ["Not a number"]
        else:
            values = SnippetRating.RATINGS
            if (urating >= values[0][0] and
                    urating <= values[len(values)-1][0]):
                u = request.user
                try:
                    s = Snippet.objects.get(id=sid)
                except ObjectDoesNotExist:
                    errors += ["Snippet does not exist"]
                else:
                    try:
                        srating = SnippetRating.objects.get(user=u,
                                                            snippet=s)
                    except ObjectDoesNotExist:
                        srating = SnippetRating(user=u, snippet=s,
                                                rating=urating)
                    else:
                        srating.rating = urating
                    srating.save()
            else:
                errors += ["Out of range rating: {}".format(urating)]
    return view_snippet(request, sid, errors)

def view_random_snippet(request):
    """Select a random snippet for the database to view."""
    snippets = Snippet.objects.all()
    if len(snippets) == 0:
        return view_snippet(request, -1)
    else:
        index = randint(0, len(snippets)-1)
        snippet = snippets[index]
        return view_snippet(request, snippet.id)

def search_snippet(request):
    """Search results for the query."""
    context = RequestContext(request)
    snippets = None
    query = None
    errors = []
    if request.method == "POST":
        query = request.POST["query"]
        snippets = Snippet.objects.filter(name__contains=query)
    else:
        errors += ["No search term provided."]
    return render_to_response("codesnippet/search_snippet.html",
                                  {"snippets" : snippets,
                                   "latestSnippets" : getLatestSnippets(),
                                   "query" : query,
                                   "errors" : errors},
                                  context)
def advanced_search(request):
    """Advanced searching of a snippet (by category and language)."""
    context = RequestContext(request)
    snippets = None
    query = None
    errors = []
    if request.method == "POST":
        form = SnippetSearchForm(data = request.POST)
        if form.is_valid():
            s = form.save(commit=False)
            snippets = Snippet.objects.filter(name__contains=s.name,
                                              category=s.category,
                                              language=s.language)
            return render_to_response("codesnippet/search_snippet.html",
                                  {"snippets" : snippets,
                                   "latestSnippets" : getLatestSnippets(),
                                   "query" : s.name,
                                   "category" : s.category,
                                   "language" : s.language,
                                   "errors" : errors},
                                  context)
    else:
        form = SnippetSearchForm()
    return render_to_response("codesnippet/advanced_search.html",
                              {"form" : form,
                               "latestSnippets" : getLatestSnippets(),
                               "errors" : errors},
                              context)

def view_top_snippets(request):
    """Dummy view just so I could see what my page looked like."""
    context = RequestContext(request)
    return render_to_response("codesnippet/top_snippets.html",{
                               "latestSnippets" : getLatestSnippets()}, context)

def browser_snippets(request):
    """Dummy view just so I could see what my page looked like."""
    context = RequestContext(request)
    return render_to_response("codesnippet/browse_snippets.html", {
                               "latestSnippets" : getLatestSnippets()}, context)
