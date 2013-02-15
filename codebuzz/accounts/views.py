from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
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
