# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class UserManager(BaseUserManager):
    def create_user(self, email, username, fullname, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        if not username:
            raise ValueError(_('The Username field must be set'))
        if not fullname:
            raise ValueError(_('The Fullname field must be set'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, fullname=fullname, password=password, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, fullname, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self.create_user(email, username, fullname, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=50)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=40, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    date_ideas = models.JSONField(default=list)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'fullname']

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        related_name='eventi_user_set',
        related_query_name='eventi_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        related_name='eventi_user_set', 
        related_query_name='eventi_user',
    )

    def __str__(self):
        return self.email

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None

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

    current_user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=70, null=True)
    description = models.TextField()
    location = models.CharField(max_length=70)
    budget = models.CharField(max_length=9, choices=BUDGET_CHOICES)
    date_created = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title} - {self.description} - {self.location} - {self.budget} - {self.date_created} - {self.completed}'
