from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from mysite.books.models import *

@login_required
def hello(request):
    msg = "Hello world, you are at {}{}.".format(request.get_host(),
                                                request.get_full_path())
    return HttpResponse(msg)

def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))

def search_form(request):
	return render_to_response('search_form.html',
                              context_instance=RequestContext(request))

def search(request):
    errors = []
    if 'q' in request.GET:
        q = request.GET['q']
        if not q:
            errors.append('Enter a search term.')
        elif len(q) > 20:
            errors.append('Please enter at most 20 characters.')
        if errors:
        	return render_to_response('search_form.html',
            	{'errors': errors})
        books = Book.objects.filter(title__icontains=q)
        return render_to_response('search_results.html',
            {'books': books, 'query': q},
            context_instance=RequestContext(request))

def book_details(request, identifier):
    try:
        book = Book.objects.get(id=identifier)
    except DoesNotExist:
        book = None
    return render_to_response('book_details.html', {'book' : book},
                              context_instance=RequestContext(request))
    
## Login/Register functions ##
    
def register(request):
        context = RequestContext(request)
        registered = False
        username = None
        if request.method == 'POST':
            uform = UserForm(data = request.POST)
            pform = UserProfileForm(data = request.POST)
            if uform.is_valid() and pform.is_valid():
                user = uform.save()
                user.set_password(user.password)
                user.save()
                profile = pform.save(commit = False)
                profile.user = user
                profile.save()
                registered = True
                username = user.username
            else:
                print uform.errors, pform.errors
        else:
            uform = UserForm()
            pform = UserProfileForm()
            
        return render_to_response('registration.html',
                                  {'uform': uform, 'pform': pform,
                                   'registered' : registered,
                                   'username' : username},
                                  context)

def user_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect("/books/")
            else:
                msg = "Your account is disabled."
        else:
            msg = "Invalid username or password"
        return render_to_response("login.html", {"msg" : msg})
    else:
        return render_to_response("login.html", {})

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect("/")
