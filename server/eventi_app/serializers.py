from rest_framework import serializers
from .models import User, DateIdea

class DateIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateIdea
        fields = ['id', 'title', 'description', 'location', 'budget']

class UserSerializer(serializers.ModelSerializer):
    date_ideas = DateIdeaSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'username', 'date_joined', 'date_ideas']
