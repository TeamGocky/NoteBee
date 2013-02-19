from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from codesnippet.models import Bookmark, Snippet

def user_login(request):
    context = RequestContext(request)
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect("/codesnippet/")
            else:
                msg = "Your account is disabled."
        else:
            msg = "Invalid username or password"
        return render_to_response("login.html", {"msg" : msg}, context)
    else:
        return render_to_response("login.html", {}, context)

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
            snippets = Snippet.objects.filter(user=userView)
        except ObjectDoesNotExist:
            errors.append("User has no bookmarks.")
    return render_to_response("accounts/view.html",
            {"userView" : userView, "errors" : errors,
             "bookmarks" : bookmarks, "snippets" : snippets}, context)