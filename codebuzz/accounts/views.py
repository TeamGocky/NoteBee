from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

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
        return render_to_response("login.html", {"msg" : msg})
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
    user = None
    try:
        user = User.objects.get(id=uid)
    except ObjectDoesNotExist:
        errors.append("User does not exist.")
    return render_to_response("accounts/view.html", {"userView" : user,
                                                     "errors" : errors},
                              context)
        
