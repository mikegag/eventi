from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, fullname, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(fullname=fullname, email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, fullname, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(fullname, email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=50)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=40, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    date_ideas = models.JSONField(default=list)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'fullname']

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_preferences')
    partner = models.CharField(max_length=70)
    location = models.CharField(max_length=70)
    interests = models.TextField()

    def __str__(self):
        return f'{self.user.username} Preferences'

class DateIdea(models.Model):
    BUDGET_CHOICES = [
        ('cheap', '$0-$20'),
        ('medium', '$40-$80'),
        ('expensive', '$80 or more'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='date_ideas')
    title = models.CharField(max_length=70, null=True)
    description = models.TextField()
    location = models.CharField(max_length=70)
    budget = models.CharField(max_length=9, choices=BUDGET_CHOICES)
    date_created = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title} - {self.description} - {self.location} - {self.budget} - {self.date_created} - {self.completed}'
