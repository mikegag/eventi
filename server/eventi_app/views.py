from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import SignUpForm, ProfilePreferenceForm

def login(request):
    if request.method == 'POST':


def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile_preference')
    else:
        form = SignUpForm()
    return request, {'form': form}

def profile_preference(request):
    if request.method == 'POST':
        form = ProfilePreferenceForm(request.POST)
        if form.is_valid():
            profile_preference = form.save(commit=False)
            profile_preference.user = request.user
            profile_preference.save()
            return redirect('profile')  # or wherever you want to redirect
    else:
        form = ProfilePreferenceForm()
    return request, {'form': form}

