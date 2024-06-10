import json
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import login as auth_login, authenticate
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from .models import User, Profile, DateIdea
from .serializers import DateIdeaSerializer

def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    return JsonResponse({'message': 'Login page'})  # Example response for GET request

def sign_up(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.create_user(
                fullname=data['fullname'],
                email=data['email'],
                username=data['username'],
                password=data['password']
            )
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@login_required
def get_profile(request):
    if request.method == 'GET':
        user = request.user
        profile_data = {
            'date_joined': user.date_joined,
            'username': user.username,
            'fullname': user.fullname,
        }
        return JsonResponse(profile_data)

@login_required
def get_profile_preferences(request):
    if request.method == 'GET':
        user = request.user
        profile_preferences = Profile.objects.get(user=user)
        preferences_data = {
            'partner': profile_preferences.partner,
            'location': profile_preferences.location,
            'interests': profile_preferences.interests,
        }
        return JsonResponse(preferences_data)

@login_required
def edit_profile_preferences(request):
    if request.method == 'POST':
        user = request.user
        data = json.loads(request.body)
        try:
            profile_preferences, created = Profile.objects.get_or_create(user=user)
            profile_preferences.partner = data.get('partner', profile_preferences.partner)
            profile_preferences.location = data.get('location', profile_preferences.location)
            profile_preferences.interests = data.get('interests', profile_preferences.interests)
            profile_preferences.save()
            return JsonResponse({'message': 'Profile preferences updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@login_required
def get_personal_information(request):
    if request.method == 'GET':
        user = request.user
        personal_info = {
            'username': user.username,
            'email': user.email,
            'fullname': user.fullname,
        }
        return JsonResponse(personal_info)

@login_required
def delete_account(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        return JsonResponse({'message': 'Account deleted successfully'}, status=204)

@login_required
def get_date_ideas(request):
    user = request.user
    date_ideas = DateIdea.objects.filter(user=user)
    serializer = DateIdeaSerializer(date_ideas, many=True)
    return JsonResponse(serializer.data, safe=False)

@login_required
def get_date_details(request, pk):
    user = request.user
    idea = get_object_or_404(DateIdea, user=user, pk=pk)
    serializer = DateIdeaSerializer(idea, many=False)
    return JsonResponse(serializer.data)

@login_required
def update_date_idea(request, pk):
    if request.method == 'POST':
        user = request.user
        idea = get_object_or_404(DateIdea, user=user, pk=pk)
        data = json.loads(request.body)

        idea.title = data.get('title', idea.title)
        idea.description = data.get('description', idea.description)
        idea.location = data.get('location', idea.location)
        idea.budget = data.get('budget', idea.budget)
        idea.completed = data.get('completed', idea.completed)

        idea.save()

        return JsonResponse({'message': 'Date idea updated successfully'}, status=200)

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/login',
            'method': 'POST',
            'body': {
                'email': 'string',
                'password': 'string'
            },
            'description': 'Logs in an existing user'
        },
        {
            'Endpoint': '/signup',
            'method': 'POST',
            'body': {
                'fullname': 'string',
                'email': 'string',
                'username': 'string',
                'password': 'string'
            },
            'description': 'Creates a new user'
        },
        {
            'Endpoint': '/dashboard',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of all date idea objects belonging to the user'
        },
        {
            'Endpoint': '/dashboard/profile',
            'method': 'GET',
            'body': None,
            'description': 'Returns an object with profile information belonging to the user'
        },
        {
            'Endpoint': '/dashboard/profile/profile-preferences',
            'method': 'GET',
            'body': None,
            'description': 'Returns an object with profile preferences belonging to the user'
        },
        {
            'Endpoint': '/dashboard/profile/profile-preferences/edit',
            'method': 'POST',
            'body': {
                'partner': 'string',
                'location': 'string',
                'interests': 'string'
            },
            'description': 'Updates and returns the profile preferences'
        },
        {
            'Endpoint': '/dashboard/profile/personal-information',
            'method': 'GET',
            'body': None,
            'description': 'Returns an object with personal information belonging to the user'
        },
        {
            'Endpoint': '/dashboard/date-list',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of all date idea objects belonging to the user'
        },
        {
            'Endpoint': '/dashboard/date-list/<id>',
            'method': 'GET',
            'body': None,
            'description': 'Returns an object of a specific date idea'
        },
        {
            'Endpoint': '/dashboard/date-list/<id>/update',
            'method': 'POST',
            'body': {
                'title': 'string',
                'description': 'string',
                'location': 'string',
                'budget': 'string'
            },
            'description': 'Updates and returns an object of the specific date idea'
        },
        {
            'Endpoint': '/delete-account',
            'method': 'POST',
            'body': None,
            'description': 'Deletes user account from database'
        },
    ]
    return Response(routes)
