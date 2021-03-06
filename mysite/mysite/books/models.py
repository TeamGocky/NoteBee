from django.db import models
from django.contrib.auth.models import User
from django import forms

class Publisher(models.Model):
	name = models.CharField(max_length=30)
	address = models.CharField(max_length=50)
	city = models.CharField(max_length=60)
	state_province = models.CharField(max_length=30)
	country = models.CharField(max_length=50)
	website = models.URLField()

	def __unicode__(self):
		return self.name

	class Meta:
		ordering = ['name']

class Author(models.Model):
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=40)
	email = models.EmailField(blank=True, verbose_name='e-mail')

	def __unicode__(self):
		return u'%s %s' % (self.first_name, self.last_name)

	class Meta:
		ordering = ['last_name']

class Book(models.Model):
	title = models.CharField(max_length=100)
	authors = models.ManyToManyField(Author)
	publisher = models.ForeignKey(Publisher)
	publication_date = models.DateField()

	def __unicode__(self):
		return self.title
	
	def attrs(self):
		for field in self._meta.fields:
			if field.name != "id":
				yield field.name, getattr(self, field.name)
	
	class Meta:
		ordering = ['title']

class UserProfile(models.Model):
        # This field is required.
        user = models.OneToOneField(User)
        # These fields are optional
        website = models.URLField(blank=True)

        def __unicode__(self):
                return self.user.username

class UserForm(forms.ModelForm):
	password = forms.CharField(widget=forms.PasswordInput()) 
        class Meta:
                model = User
                fields = ["username", "email", "password"]

class UserProfileForm(forms.ModelForm):
        class Meta:
                model = UserProfile
                fields = ["website"]
