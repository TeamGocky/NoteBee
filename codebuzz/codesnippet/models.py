from django.db import models


class Snippet(models.Model):
    """Model to represent a code snippet."""
    pass

class Category(models.Model):
    """Represents the set of categories to which a snippet belongs."""
    pass

class Language(models.Model):
    """The languages support by the application."""
    pass

class Comment(models.Model):
    """User comments on code snippets."""
    pass
