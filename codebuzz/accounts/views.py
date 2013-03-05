from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from codesnippet.models import *
from codesnippet.views import getLatestSnippets, getTopRatedSnippets
from operator import itemgetter

def user_login(request):
    context = RequestContext(request)
    redirect = request.GET.get('next', '/codesnippet/')
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(redirect)
            else:
                msg = "Your account is disabled."
        else:
            msg = "Invalid username or password"
        return render_to_response("login.html", {"msg" : msg,
                    "latestSnippets" : getLatestSnippets(),
                    "topSnippets" : getTopRatedSnippets()}, context)
    else:
        return render_to_response("login.html",
                    {"latestSnippets" : getLatestSnippets(),
                     "topSnippets" : getTopRatedSnippets()}, context)

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect("/")

@login_required
def user_view(request, uid):
    """View the user with id = the uid argument."""
    context = RequestContext(request)
    errors = []
    userView = None
    bookmarks = None
    snippets = None
    modes = None
    languages = None
    topUserSnippets = None
    allLanguages = Language.objects.all().order_by("name")
    try:
        userView = User.objects.get(id=uid)
    except ObjectDoesNotExist:
        errors.append("User does not exist.")
    if userView is not None:
        try:
            bookmarks = Bookmark.objects.filter(user=userView)
        except ObjectDoesNotExist:
            errors.append("User has no bookmarks.")
        try:
            snippets = Snippet.objects.filter(user=userView).order_by("-id")
        except ObjectDoesNotExist:
            errors.append("User has no snippets.")
        if snippets is not None:
            try:
                modes = snippets.values_list('language').order_by('language').distinct()
                languages = Language.objects.filter(mode__in=modes).order_by('name')
            except ObjectDoesNotExist:
                error.append("Could not get list of languages user codes in.")
            try:
                topUserSnippets = []
                for snippet in list(snippets):
                    ratings = SnippetRating.objects.filter(snippet=snippet)
                    total_rating = 0.0
                    if len(ratings) > 0:
                        for r in ratings:
                            total_rating += r.rating
                        total_rating = total_rating / len(ratings)
                    topUserSnippets += [[snippet, total_rating]]
                if topUserSnippets is not []:
                    topUserSnippets = sorted(topUserSnippets, key=itemgetter(1))[::-1]
                    topUserSnippets = topUserSnippets[:5]
            except ObjectDoesNotExist:
                error.append("Could not get list of ratings.")
            snippets = snippets[:5]
    return render_to_response("accounts/view.html",
            {"userView" : userView, "errors" : errors,
             "bookmarks" : bookmarks, "snippets" : snippets,
             "languages" : languages, "topUserSnippets" : topUserSnippets,
             "topSnippets" : getTopRatedSnippets(),
             "latestSnippets" : getLatestSnippets()}, context)