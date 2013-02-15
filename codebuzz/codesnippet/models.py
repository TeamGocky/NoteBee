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
    rating = models.IntegerField(choices=ratings)
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
