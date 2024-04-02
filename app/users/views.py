from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from . forms import RegisterUserForm
from website import models
import sqlite3
from website import views, random_stuff, app_functions, vistior_session_stuff, decorators_


db_path = 'db.sqlite3'
members_table = 'website_members'


def check_state2(func):
    def wrapper(request, *args, **kwargs):
        value = vistior_session_stuff.new_vistor(request)
        if value[0] == 'bad':
            context = {"state": value[1]}
            context.update(views.basic_context)
            return render(request, 'state_protest.html', context)
        else:
            return func(request, *args, **kwargs)
    return wrapper



def login_required2(func):
    def wrapper(request):
        if decorators_.maintenance == True:
            context = {}
            return render(request, 'pages/maintenance.html', context)
        elif request.user.is_authenticated:
            return func(request)
        else:
            messages.success(request, 'You must be logged in to view that page.')
            return redirect('login')
    return wrapper



def check_maintenance(func):
    def wrapper(request):
        if decorators_.maintenance == True:
            context = {}
            return render(request, 'pages/maintenance.html', context)
        else:
            return func(request)
    return wrapper


# function that gets user IP and broswer info
def get_new_userIP(username):
    # step 1 get user id from username
    # step 2 get ip address
    # step 3 make api call to get user loctation from ip and computer info
    # format all that data and update the members db
    pass



def add_new_member(db_path, username, email):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO {members_table} (username, user_email) VALUES (?, ?)", (username, email))
    conn.commit()
    conn.close()
    


@check_maintenance
@check_state2
def loginUser(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.success(request, 'login failed...')
            return redirect('login')
    else:
        return render(request, 'authenticate/login.html', views.basic_context)
    
    
    
#! dont forget to add users IP, computer and broswer to their info when they first resgieter
@check_maintenance
@check_state2
def join(request):
    if request.method == "POST":
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            email = form.cleaned_data['email']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Your account has been created!')
            add_new_member(db_path, username, email)
            return redirect('dashboard')
            #! change redirct to dashboard 
    else:
        form = RegisterUserForm()
    
    
    context = {'form':form}
    context.update(views.basic_context)
    return render(request, 'authenticate/register_user.html', context)
    
    


def logout_user(request):
    messages.success(request, 'logged out')
    logout(request)
    return redirect('index1')


    

def get_user_info(username):
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    cur.execute(f'SELECT id FROM {members_table} WHERE username = ?', (username,))
    userID = cur.fetchall()[0][0]
    cur.execute(f'SELECT * FROM {members_table} WHERE id = ?', (userID,))
    member = cur.fetchall()
    db.commit()
    db.close()
    
    return member
    # get the user based on ID



# user main dashboard
@login_required2
def dashboard(request):
    members = get_user_info(str(request.user.username))[0]
    
    profile_description = members[11]
    gender = members[4]
    email = members[3]
    profileViews = members[12]
    videoViews = members[13]
    
    context = {
        'pd': profile_description,
        'gender':gender,
        'email': email,
        'profileViews': profileViews,
        'videoViews': videoViews,
        
    }
    context.update(views.basic_context)
    return render(request, 'authenticate/dashboard.html', context)





def likes(request):
    if request.user.is_authenticated:
        posts = models.Post.objects.filter(likes=request.user)
        
        context = {
            'posts': posts,
            "site_name":random_stuff.name_,
            'currentYear': random_stuff.currentYear,
        }
        context.update(views.basic_context)
        return render(request, 'authenticate/user_dashboard/user_likes.html', context)
    
    else:
        messages.success(request, 'You must be logged in to view that page.')
        return redirect('login')



# route function for profile visits
def profile_page(request, username):
    userInfo = app_functions.get_user_info(str(username))
    # returns list of IDs of users uploads
    userVideos = app_functions.get_user_uploads(str(username))
    
    posts = models.Post.objects.filter(id__in=userVideos)
    
    app_functions.add_profile_view(str(username))
    
    about_paragraph = userInfo[0][11]
    gender = userInfo[0][4]
    profileViews = userInfo[0][12]

    videoViews = app_functions.get_all_user_video_upload_views(str(username))
    
    metaD_gender = ''
    if gender == "Male":
        metaD_gender = 'his'
    elif gender == "Female":
        metaD_gender = 'her'
    else:
        metaD_gender = "their"
    
    context = {
        "username": username,
        "about": about_paragraph,
        'gender':gender,
        'profileViews': profileViews,
        'videoViews': videoViews,
        'posts': posts,
        'forMETA':metaD_gender,
    }
    context.update(views.basic_context)
    
    
    if views.maintenance == True:
        return render(request, 'pages/maintenance.html', context)
    else:
        return render(request, 'user_profile/profile.html', context)



# ----------------------------- user edit and uploads section -------------------------------- #

def videos_uploaded(request):
    if request.user.is_authenticated:
        ids = app_functions.get_user_uploads(request.user)
        posts = models.Post.objects.filter(id__in=ids)
        
        context = {
            'posts': posts,
            "site_name":random_stuff.name_,
            'currentYear': random_stuff.currentYear,
        }
        context.update(views.basic_context)
        return render(request, 'authenticate/user_dashboard/videos_uploaded.html', context)
    
    elif views.maintenance == True:
        return render(request, 'pages/maintenance.html', context)
    
    else:
        messages.success(request, 'You must be logged in to view that page.')
        return redirect('login')
    
    
def pictures_uploaded(request):
    if request.user.is_authenticated:
        ids = app_functions.get_user_pictures(request.user)
        posts = models.Post.objects.filter(id__in=ids)
        
        context = {
            'posts': posts,
            "site_name":random_stuff.name_,
            'currentYear': random_stuff.currentYear,
        }
        context.update(views.basic_context)
        return render(request, 'authenticate/user_dashboard/pictures_uploaded.html', context)
    
    elif views.maintenance == True:
        return render(request, 'pages/maintenance.html', context)
    
    else:
        messages.success(request, 'You must be logged in to view that page.')
        return redirect('login')
    

def edit_upload(request, id):
    if request.user.is_authenticated:
        posts = app_functions.get_edit_video(id)
        video_title = posts[0][1]
        video_caption = posts[0][2]
        video_tags = posts[0][5]
        video_thumbnail = posts[0][10]
        video_id = posts[0][0]
        
        
        context = {
            'posts': posts,
            "site_name":random_stuff.name_,
            'currentYear': random_stuff.currentYear,
            "video_title": video_title,
            "video_caption": video_caption,
            'video_tags': video_tags,
            "video_thumbnail": video_thumbnail,
            'thumbnail_warning': random_stuff.thumbnail_warning,
            'video_id':video_id
        }
        context.update(views.basic_context)
        return render(request, 'authenticate/user_edits/edit_video.html', context)
    
    elif views.maintenance == True:
        return render(request, 'pages/maintenance.html', context)
    
    else:
        messages.success(request, 'You must be logged in to view that page.')
        return redirect('login')
    
    
def new_edited_video(request):
    if request.method == "POST":
        new_title = request.POST.get('video_title')
        new_caption = request.POST.get('video_caption')
        new_tags = request.POST.get('video_tags')
        video_id = request.POST.get('video_id')
    
        # add function to update video section
        
    messages.success(request, 'Your video has been updated')
    return redirect('edit_upload', id=video_id)



# page for the user to edit their profile information
def user_edit_profile_page(request):
    if request.user.is_authenticated:
        user_info = app_functions.get_user_info(str(request.user))
        username = user_info[0][1]
        user_email = user_info[0][3]
        user_gender = user_info[0][4]
        user_dob = user_info[0][5]
        user_fname = user_info[0][7]
        user_lname = user_info[0][8]
        profile_d = user_info[0][11]
        
        context = {
            "site_name":random_stuff.name_,
            'currentYear': random_stuff.currentYear,
            'user_username': username,
            "user_email": user_email,
            "user_gender": user_gender,
            'user_dob': user_dob, 
            'user_fname': user_fname,
            "user_lname": user_lname,
            "pd": profile_d,
        }
        context.update(views.basic_context)
        return render(request, 'authenticate/user_edits/edit_profile.html', context)
    
    elif views.maintenance == True:
        return render(request, 'pages/maintenance.html', context)
    
    else:
        messages.success(request, 'You must be logged in to view that page.')
        return redirect('login')
        
        

@login_required2
def submission(request):
    context = {
        
    }
    context.update(views.basic_context)
    return render(request, 'authenticate/user_dashboard/submission.html', context)



def rules(request):
    return render(request, 'authenticate/user_dashboard/rules.html', views.basic_context)