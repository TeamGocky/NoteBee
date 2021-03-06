from django.db import models
from django.contrib.auth.models import User
from django import forms

class Category(models.Model):
    """Represents the set of categories to which a snippet belongs."""
    name = models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name

class Language(models.Model):
    """The languages support by the application."""
    name = models.CharField(max_length=20)
    mode = models.CharField(primary_key=True, max_length=40)
    
    def __unicode__(self):
        return self.name

class Snippet(models.Model):
    """Model to represent a code snippet."""
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category)
    language = models.ForeignKey(Language)
    # Allow NULL user corresponding to Anon.
    user = models.ForeignKey(User, blank=True, null=True,
                             on_delete=models.SET_NULL)
    votes = models.IntegerField(default=0)
    # Number of times viewed (only count registered users)
    hits = models.IntegerField(default=0)
    body = models.TextField()
    
    def __unicode__(self):
        return self.name

    def attrs(self):
        for field in self._meta.fields:
            if field.name != "id":
                yield field.name, getattr(self, field.name)
    
    class Meta:
        ordering = ["name"]

class SnippetRating(models.Model):
    """Records a rating of a snippet by a user."""
    RATINGS = [(x, x) for x in xrange(0, 6)]
    user = models.ForeignKey(User)
    snippet = models.ForeignKey(Snippet)
    rating = models.FloatField(default=0.0)

class Comment(models.Model):
    """User comments on code snippets."""
    # Allow blank foreign keys to allow the setting of them after
    # form submission.
    snippet = models.ForeignKey(Snippet, blank=True, null=True,
                                on_delete=models.SET_NULL)
    user = models.ForeignKey(User, blank=True, null=True,
                             on_delete=models.SET_NULL)
    comment = models.TextField()
    
    def __unicode__(self):
        return self.comment

class Bookmark(models.Model):
    """Represents a user's bookmarking of a code snippet."""
    user = models.ForeignKey(User)
    snippet = models.ForeignKey(Snippet)

    def __unicode__(self):
        return self.snippet.name

