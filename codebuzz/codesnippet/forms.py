from django import forms
from codesnippet.models import Category, Comment, Language, Snippet,\
                               SnippetRating

class SnippetForm(forms.ModelForm):
    language = forms.ModelChoiceField(queryset=Language.objects.order_by('name'))
    category = forms.ModelChoiceField(queryset=Category.objects.order_by('name'))

    class Meta:
        model = Snippet
        fields = ["name", "body", "language", "category"]
        body_attrs = {"id" : "editor", "class" : "CodeMirror"}
        lang_attrs = {"id" : "languages", "onchange" : "selectLang()"}
        widgets = {
            "body" : forms.Textarea(attrs=body_attrs),
            "language" : forms.Select(attrs=lang_attrs),
        }

class SnippetRatingForm(forms.ModelForm):
    rating_attrs = {"onchange" : "submitRating()"}
    rating = forms.ChoiceField(widget=forms.Select(attrs=rating_attrs),
                               choices=SnippetRating.RATINGS)
    class Meta:
        model = SnippetRating
        fields = ["rating"]

class SnippetSearchForm(forms.Form):
    name = forms.CharField(max_length=200)
    blank_is_all = "Leave blank to specify all {}."
    language = forms.ModelMultipleChoiceField(queryset=Language.objects.order_by('name'),
                                              required=False,
                             help_text=blank_is_all.format("languages"))
    category = forms.ModelMultipleChoiceField(queryset=Category.objects.order_by('name'),
                                              required=False,
                             help_text=blank_is_all.format("categories"))

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
