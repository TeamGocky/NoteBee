from random import randint, seed
try:
	import twitter
	twitterSuccess = True
except:
    print 'Twitter could not be imported'
    twitterSuccess = False
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.utils import simplejson
from django import template

from codesnippet.forms import CommentForm, SnippetForm,\
                              SnippetRatingForm, SnippetSearchForm
from codesnippet.models import Bookmark, Category, Comment, Language,\
                               Snippet, SnippetRating
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
            if twitterSuccess:
                try:
                    api = twitter.Api(consumer_key='0aIAx6JBFjCRsVo2I6m5VQ',
                                consumer_secret='ezaCJZNLJtTRaIogVvv08u3thnwSTtDMHmRMMs7lyk',
                                access_token_key='1219662349-DJfNG23p2NLME6VAQv02gGNJXLiVQ1r99upKB0k',
                                access_token_secret='P806WM9qbwg81Q1lGsVvRZ1Xl3PACurSmL1BWqCHgg')
                    api.PostUpdate('A new snippet written in ' + 
                                    snippet.language.name + ' called "' + 
                                    snippet.name + '" has just been submitted!')
                except:
                    print 'Twitter posting failed.'
            view = "view/{}/".format(snippet.id)
            return HttpResponseRedirect(view)
        else:
            print form.errors
    else:
        form = SnippetForm()
    return render_to_response('index.html', {"form" : form}, context)

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

def get_total_rating(snippet):
    """Get the total rating of the snippet."""
    total = 0.0
    try:
        ratings = SnippetRating.objects.filter(snippet=snippet)
        if len(ratings) > 0:
            snippet.votes = len(ratings)
            snippet.save()
            for r in ratings:
                total += r.rating
            total = total / len(ratings)
    except ObjectDoesNotExist:
        pass
    return total

def view_snippet(request, sid, errors=[]):
    """View the snippet with id = sid argument."""
    context = RequestContext(request)
    errors = []
    try:
        snippet = Snippet.objects.get(id=sid)
        snippet.hits += 1
        snippet.save()
        
        # Check to see if this snippet is bookmarked by this user
        bookmarked = False
        if request.user.is_authenticated():
            try:
                Bookmark.objects.get(snippet=snippet, user=request.user)
            except ObjectDoesNotExist:
                pass
            else:
                bookmarked = True
        # Get the comments for this snippet.
        comments = Comment.objects.filter(snippet=snippet)
        
        ratings = SnippetRating.objects.filter(snippet=sid)
        # Set selected rating to the submitted rating for this user
        initial = get_rating(request, snippet)
        if initial is None:
            initial = 0
        rform = SnippetRatingForm(initial={"rating" : int(initial)})
        total_rating = 0.0
        rating_width = 0
        if len(ratings) > 0:
            snippet.votes = len(ratings)
            snippet.save()
            for r in ratings:
                total_rating += r.rating
            total_rating = total_rating / len(ratings)
            # Calculate percentage rating width
            rating_width = (total_rating / 5) * 100
        cform = CommentForm()
        return render_to_response("codesnippet/view_snippet.html",
                              {"snippet" : snippet,
                               "rating" : total_rating,
                               "rating_form" : rform,
                               "bookmarked" : bookmarked,
                               "comments" : comments,
                               "comment_form" : cform,
                               "rating_width" : "{}%".format(int(rating_width)),
                               "errors" : errors},
                              context)
    except ObjectDoesNotExist:
        errors += ["Snippet does not exist"]
        return render_to_response("codesnippet/view_snippet.html",
                                  {"errors" : errors},
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
                    total_rating = get_total_rating(s)
                    # Pass new total back to page.
                    obj = simplejson.dumps({"user_rating" : urating,
                                            "total_rating" : "{}".format(total_rating)})
                    return HttpResponse(obj,
                                        content_type="application/json")
            else:
                errors += ["Out of range rating: {}".format(urating)]
    return view_snippet(request, sid, errors)

@login_required
def submit_comment(request, sid):
    """Submit a rating by a user for a snippet."""
    errors = []
    if request.method == "POST":
        cform = CommentForm(data = request.POST)
        if cform.is_valid():
            comment = cform.save(commit=False)
            comment.user = request.user
            try:
                comment.snippet = Snippet.objects.get(id=sid)
            except ObjectDoesNotExist:
                errors += ["Snippet does not exist"]
            else:
                comment.save()
        else:
            errors += cform.errors
        return view_snippet(request, sid, errors)
    return HttpResponseRedirect("/codesnippet/view/" + sid)

@login_required
def bookmark_snippet(request, sid):
    """Adds a bookmark to the logged in users account."""
    context = RequestContext(request)
    if request.is_ajax() and request.method == "POST":
        bookmark = request.POST["bookmark"]
        try:
            snippet = Snippet.objects.get(id=sid)
        except ObjectDoesNotExist:
            pass
        else:
            if bookmark == "1":
                try:
                    bk = Bookmark.objects.get(snippet=snippet, user=request.user)
                except ObjectDoesNotExist:
                    bk = Bookmark(snippet=snippet, user=request.user)
                    bk.save()
                return HttpResponse("Snippet has been added to your bookmarks.")
            elif bookmark == "0":
                try:
                    bk = Bookmark.objects.get(snippet=snippet, user=request.user).delete()
                except ObjectDoesNotExist:
                    return HttpResponse("Snippet was not bookmarked.")
                return HttpResponse("Snippet has been removed from your bookmarks.")
    else:
        return HttpResponse("POST FAILED!")

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
            name = form.cleaned_data["name"]
            languages = form.cleaned_data["language"]
            categories = form.cleaned_data["category"]
            if len(languages) == 0:
                languages = Language.objects.all()
            if len(categories) == 0:
                categories = Category.objects.all()
            snippets = Snippet.objects.filter(name__contains=name,
                                              category__in=categories,
                                              language__in=languages)
            return render_to_response("codesnippet/search_snippet.html",
                                  {"snippets" : snippets,
                                   "query" : name,
                                   "errors" : errors},
                                  context)
    else:
        form = SnippetSearchForm()
    return render_to_response("codesnippet/advanced_search.html",
                              {"form" : form, "errors" : errors},
                               context)

def browse_language(request, language):
    context = RequestContext(request)
    chosenLanguage = Language.objects.filter(name=language)[:1]
    snippets = Snippet.objects.filter(language__in=chosenLanguage)
    return render_to_response("codesnippet/browse_language.html",
                              {"snippets" : snippets,
                               "language" : language}, context)

def browse_category(request, category):
    context = RequestContext(request)
    chosenCategory = Category.objects.filter(name=category)[:1]
    snippets = Snippet.objects.filter(category__in=chosenCategory)
    return render_to_response("codesnippet/browse_category.html",
                              {"snippets" : snippets,
                               "category" : category}, context)

def browser_snippets(request):
    context = RequestContext(request)
    languages = Language.objects.all().order_by("name")
    categories = Category.objects.all().order_by("name")
    return render_to_response("codesnippet/browse_snippets.html", {
                              "languages" : languages,
                              "categories" : categories}, context)
