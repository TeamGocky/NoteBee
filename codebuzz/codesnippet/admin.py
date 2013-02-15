from django.contrib import admin
from codesnippet.models import Category, Comment, Language, Snippet

admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Language)
admin.site.register(Snippet)
