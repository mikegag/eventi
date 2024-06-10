from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, username, fullname, password=None):
        if not email:
            raise ValueError(_('The Email field must be set'))
        if not username:
            raise ValueError(_('The Username field must be set'))
        if not fullname:
            raise ValueError(_('The Fullname field must be set'))

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            fullname=fullname,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, fullname, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            fullname=fullname,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

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
