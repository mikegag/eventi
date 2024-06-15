from django.urls import path
from . import views
from .views import csrf_token
 
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('csrf_token/', csrf_token, name='csrf_token'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.sign_up, name='sign_up'),
    path('logout/', views.user_logout, name='logout'),
    path('dashboard/', views.get_dashboard, name='dashboard'),
    path('dashboard/profile/', views.get_profile, name='profile'),
    path('dashboard/profile/profile-preferences/', views.get_profile_preferences, name='profile_preferences'),
    path('dashboard/profile/profile-preferences/edit/', views.edit_profile_preferences, name='edit_profile_preferences'),
    path('dashboard/profile/personal-information/', views.get_personal_information, name='get_personal_information'),
    path('delete-account/', views.delete_account, name='delete_account'),
    path('dashboard/date-list/', views.get_date_ideas, name='get_date_ideas'),
    path('dashboard/date-list/<int:pk>/', views.get_date_details, name='get_date_details'),
    path('dashboard/date-list/<int:pk>/update/', views.update_date_idea, name='update_date_idea'),
    path('dashboard/add-idea/', views.add_date_idea, name='add_date_idea'),
]