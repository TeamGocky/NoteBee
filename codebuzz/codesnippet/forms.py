from django import forms
from codesnippet.models import Snippet

class SnippetForm(forms.ModelForm):
    class Meta:
        model = Snippet
        fields = ["name", "body", "language", "category"]
        body_attrs = {"id" : "editor", "class" : "CodeMirror"}
        lang_attrs = {"id" : "languages", "onchange" : "selectLang()"}
        widgets = {
            "body" : forms.Textarea(attrs=body_attrs),
            "language" : forms.Select(attrs=lang_attrs),
        }
