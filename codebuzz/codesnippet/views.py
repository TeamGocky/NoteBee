from django.shortcuts import render_to_response

def index(request):
    modes = ["clike/clike"]
    return render_to_response('index.html', {"modes" : modes}) 
