from django.shortcuts import render_to_response
from django.template import RequestContext
from codesnippet.forms import SnippetForm

def index(request):
    context = RequestContext(request)
    form = SnippetForm()
    modes = ["clike/clike"]
    return render_to_response('index.html', {"modes" : modes,
                                             "form" : form},
                              context) 
