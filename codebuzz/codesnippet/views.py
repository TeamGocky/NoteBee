from django.shortcuts import render_to_response
from django.template import RequestContext

def index(request):
    context = RequestContext(request)
    modes = ["clike/clike"]
    return render_to_response('index.html', {"modes" : modes},
                              context) 
