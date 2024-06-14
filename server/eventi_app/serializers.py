from rest_framework import serializers
from .models import User, DateIdea, Profile

class DateIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateIdea
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    date_ideas = DateIdeaSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'username', 'date_joined', 'date_ideas']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['partner', 'location', 'interests']
