from django.urls import path
from . import views, user_submission

urlpatterns = [
    path('loginUser/', views.loginUser, name='login'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('join/', views.join, name='join'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('likes/', views.likes, name='likes'),
    path('uploads/', views.videos_uploaded, name='videos_uploaded'),
    path('pictures/', views.pictures_uploaded, name='pictures_uploaded'),
    path('edit_video/<str:id>/', views.edit_upload, name='edit_upload'),
    path('user_edit_profile_page/', views.user_edit_profile_page, name='user_edit_profile_page'),
    path('profile/<str:username>/', views.profile_page, name='profile_page'),
    path('submission/', user_submission.submission, name='submission'),
    path('rules/', views.rules, name='rules'),
    # Add more patterns as needed
    
    
    # functions
    path('new_edited_video/', views.new_edited_video, name='new_edited_video'),
    path('process_submission_content/', user_submission.process_submission_content, name='process_submission_content'),
]