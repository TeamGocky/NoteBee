from django import forms
from codesnippet.models import Snippet

class SnippetForm(forms.ModelForm):
    body_attrs = {"id" : "editor", "class" : "CodeMirror"}
    body = forms.CharField(widget=forms.Textarea(attrs=body_attrs))
    class Meta:
        model = Snippet
        fields = ["name", "body", "language", "category"]
