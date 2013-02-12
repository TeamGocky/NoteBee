from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from mysite.books.models import *

def hello(request):
    return HttpResponse("Hello world, you are at {}{}.".format(request.get_host(), request.get_full_path()))

def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))

def search_form(request):
	return render_to_response('search_form.html')

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
            {'books': books, 'query': q})

def book_details(request, identifier):
    try:
        book = Book.objects.get(id=identifier)
    except DoesNotExist:
        book = None
    return render_to_response('book_details.html', {'book' : book})
    
def register(request):
        context = RequestContext(request)
        registered = False
        user = None
        if request.method == 'POST':
            uform = UserForm(data = request.POST)
            pform = UserProfileForm(data = request.POST)
            if uform.is_valid() and pform.is_valid():
                user = uform.save()
                profile = pform.save(commit = False)
                profile.user = user
                profile.save()
                registered = True
            else:
                print uform.errors, pform.errors
        else:
            uform = UserForm()
            pform = UserProfileForm()
            
        return render_to_response('registration.html',
                                  {'uform': uform, 'pform': pform,
                                   'registered': registered,
                                   'user' : user}, context)
