import json
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth import logout
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from .models import User, Profile, DateIdea, EmailBackend
from .serializers import DateIdeaSerializer, UserSerializer, ProfileSerializer
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token, rotate_token
from django.shortcuts import redirect
from urllib.parse import urlparse, parse_qs


def csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

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
            print(f"User created: {user.email}")
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            print(f"Error creating user: {e}")
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def user_login(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            response = JsonResponse({'message': 'Login successful'}, status=200)
            response.set_cookie('user_email', user.email, httponly=True, secure=True)
            return response
        else:
            print("Invalid email or password")
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def user_logout(request):
    if request.method == 'POST':
        logout(request)
        request.session.flush()
        rotate_token(request)
        response = JsonResponse({'message': 'Logout successful'}, status=200)
        response.delete_cookie('user_email')
        return response
    return JsonResponse({'error': 'Invalid request'}, status=400)

#login_required
def get_profile(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)

            if request.session.session_key and request.method == 'GET':
                profile_data = {
                    'date_joined': user.date_joined,
                    'username': user.username,
                    'fullname': user.fullname,
                }
                return JsonResponse(profile_data)
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'GET':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return get_profile(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

#login_required
def get_dashboard(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)

            if request.session.session_key and request.method == 'GET':
                #user_serializer = UserSerializer(user)
                #date_idea_serializer = DateIdeaSerializer(user.date_ideas.all(), many=True)
                dashboard_data = {
                    'username': user.username,
                    'graph_data': user.date_ideas
                }
                return JsonResponse(dashboard_data, safe=False)
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'GET':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return get_dashboard(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

#login_required
def get_profile_preferences(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)
            profile, created = Profile.objects.get_or_create(user=user)

            if request.session.session_key and request.method == 'GET':
                profile_preferences = {
                    'partner': profile.partner,
                    'location': profile.location,
                    'interests': profile.interests,
                }
                return JsonResponse(profile_preferences)
            
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'GET':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return get_profile_preferences(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

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

#login_required
def get_personal_information(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)
            #profile, created = Profile.objects.get_or_create(user=user)

            if request.session.session_key and request.method == 'GET':
                personal_information = {
                    'username': user.username,
                    'email': user.email,
                    'fullname': user.fullname,
                }
                return JsonResponse(personal_information)
            
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'GET':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return get_personal_information(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

#login_required
def delete_account(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)

            if request.session.session_key and request.method == 'POST':
                request.session.flush()
                response = JsonResponse({'message': 'Account deleted successfully'}, status=200)
                response.delete_cookie('user_email')
                user.delete()
                return response
            
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'POST':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return delete_account(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)
        
#login_required
def get_date_ideas(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)

            if request.session.session_key and request.method == 'GET':
                 # Get all date ideas related to the user
                date_ideas = DateIdea.objects.filter(current_user=user)
                serializer = DateIdeaSerializer(date_ideas, many=True)
                return JsonResponse(serializer.data, safe=False)
            
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'GET':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return get_date_ideas(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

#login_required
def add_date_idea(request):
    try:
        # Extract the email from the cookie set when user logins
        email = request.COOKIES.get('user_email')

        if not email:
            # If email is not found in cookies, return error
            return JsonResponse({'error': 'Email not found in cookies'}, status=499)
        try:
            user = User.objects.get(email=email)

            if request.session.session_key and request.method == 'POST':
                # Extracting data from the POST request
               
                data = json.loads(request.body)
                title = data.get('title')
                budget = data.get('budget')
                description = data.get('description')
                location = data.get('location')
                date_created = data.get('date_created', None)
                completed = data.get('completed', False)
     
                new_date_idea = DateIdea.objects.create(
                    current_user=user,
                    title=title,
                    description=description,
                    location=location,
                    budget=budget,
                    date_created=date_created,
                    completed=completed
                )

                # Add new_date_idea to user.date_ideas 
                user.date_ideas.append(new_date_idea)
                return JsonResponse({'success': 'Date idea successfully saved'}, status=200)
            else:
                if not request.session.session_key:
                    return JsonResponse({'error': 'Session ID not found'}, status=400)
                if request.method != 'POST':
                    return JsonResponse({'error': 'Invalid request method'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    
    except Exception as e:
        if isinstance(e, JsonResponse) and e.status_code == 499:
            # If a 400 response is returned, try to retrieve email from hidden cookie set on client side
            email = get_hidden_cookie(request)
            if not email:
                return JsonResponse({'error': 'Email not found in cookies or hidden cookie'}, status=400)
            # Retry retrieving profile data with the retrieved email
            return add_date_idea(request)
        else:
            return JsonResponse({'error': 'An internal error occurred'}, status=500)

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

def get_hidden_cookie(request):
    #used to retrieve hidden session cookie when user has cookies disabled
    if request.method == 'POST':
        data = json.loads(request.body)
        return data.get('user_email')

#needs to be updated
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
            'Endpoint': '/dashboard/add-idea',
            'method': 'POST',
            'body': {
                'current_user': 'object',
                'title': 'string',
                'description': 'string',
                'location': 'string', 
                'budget': 'string', 
                'date_created': 'string', 
                'completed': 'boolean' 
            },
            'description': 'Returns a date idea'
        },
        {
            'Endpoint': '/delete-account',
            'method': 'POST',
            'body': None,
            'description': 'Deletes user account from database'
        },
    ]
    return Response(routes)
