from django import template
from codesnippet.models import Snippet
from codesnippet.views import get_total_rating

register = template.Library()

@register.inclusion_tag("results.html")
def getLatestSnippets():
    return {"snippets" : Snippet.objects.all().order_by("-id")[:5]}


@register.inclusion_tag("results.html")
def getTopRatedSnippets():
    snippets = Snippet.objects.all()
    top_snippets = []
    cmpfn = lambda x,y: -1 if y[1] < x[1] else 0 if y[1] == x[1] else 1
    for snippet in Snippet.objects.all():
        top_snippets.append((snippet, get_total_rating(snippet)))
    top_snippets.sort(cmpfn)
    return {"snippets" : [x[0] for x in top_snippets[:5]]}
