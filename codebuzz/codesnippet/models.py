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
    ratings = [(x, x) for x in xrange(1, 6)]
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category)
    language = models.ForeignKey(Language)
    # Allow NULL user corresponding to Anon.
    user = models.ForeignKey(User, blank=True, null=True,
                             on_delete=models.SET_NULL)
    rating = models.FloatField(default=0.0)
    votes = models.IntegerField(default=0)
    # Number of times viewed (only count registered users)
    hits = models.IntegerField(default=0)
    body = models.TextField()
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        ordering = ["name"]

class Comment(models.Model):
    """User comments on code snippets."""
    snippet = models.ForeignKey(Snippet)
    user = models.ForeignKey(User)
    message = models.TextField()
    
    def __unicode__(self):
        return self.message

class Bookmark(models.Model):
    """Represents a user's bookmarking of a code snippet."""
    user = models.ForeignKey(User)
    snippet = models.ForeignKey(Snippet)

    def __unicode__(self):
        return self.snippet.name

