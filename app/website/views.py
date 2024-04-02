from django.shortcuts import render, redirect
from .models import Post
from . import app_functions, meta_info, recommendation_system
import os
from django.contrib import messages
from . import random_stuff
from .decorators_ import check_maintenance2, check_state, execution_time
from django.db.models.functions import Random

# Create your views here.

#. Is server live 
server_live = False


#. path to db
db_name1 = 'db.sqlite3'
#. table name 
ab = 'website_post'


#. orientation 
orientation_ = ["straight"]

orientation_icons = {"gay":"fa-solid fa-venus-double", 'straight': 'fa-solid fa-venus', 'trans': 'fa-solid fa-transgender'}




#==========================================================================================================================================
#, Route Function Paths



# basic context items / all basic values passed to each page
basic_context = { 
    'site_name':random_stuff.name_, 
    "currentYear": random_stuff.currentYear, 
    'discord':random_stuff.discord_link,
    'footer_paragraph': random_stuff.PARAGRAPH,
    'endtitle': random_stuff.END_TITLE,
    'trackingSystem': random_stuff.trackingSystem,
    'mobile_paragraph': random_stuff.MOBILE_PARAGRAPH,
    'server': server_live,
    'ddd': random_stuff.ddd,
    "orientation": orientation_[0],
}





#* route function for Index Page
@check_maintenance2
@check_state
@execution_time
def index1(request):
    orientation101 = str(request.COOKIES.get('orientation')) # last_video cookie 
    print('-' *45)
    print(orientation101)
    if orientation101 == 'straight' or orientation101 == "None":
        pass
    elif orientation101 == 'gay':
        return redirect('gay')
    else:
        return redirect('trans')
    
    # =============== starter variables ================ #

    last_video = str(request.COOKIES.get('last_videoCookie')) # last_video cookie 
    last_video = "None"
    
    videos0 = []
    if last_video != "None":
        ids0 = recommendation_system.standard_recommendation(last_video)
        videos0 = Post.objects.filter(title__in=ids0).order_by(Random())
    else:
        pass
    
    orientation_.clear()
    orientation_.append('straight')
    
    meta = meta_info.index_page # getting meta info for index page
        
    ids = recommendation_system.get_sub_videos()
    
    # Trending videos
    videos = Post.objects.filter(id__in=ids[0]).order_by(Random())
    # Most Liked
    videos1 = Post.objects.filter(id__in=ids[1]).order_by(Random())
    # Get exclusives
    videos2 = Post.objects.filter(id__in=ids[2]).order_by(Random())


    orientation_icon1 = orientation_icons[orientation_[0]]
    context = {
        "isLive":True, 
        'metas':meta, 
        'videos_page': videos,
        "orientation": orientation_[0],
        'oi': orientation_icon1,
        'last_video': last_video,
        'most_liked': videos1,
        'exclusives': videos2,
        're':videos0
    }
    
    context.update(basic_context)

    return render(request, 'index.html', context)
    







@check_maintenance2
@check_state
@execution_time   # | Execution time: 0.043350 seconds
def gay_homepage(request):
    # =============== starter variables ================ #
    last_video = str(request.COOKIES.get('last_videoCookie')) # last_video cookie 
    
    videos0 = []
    if last_video != "None":
        ids0 = recommendation_system.standard_recommendation(last_video)
        videos0 = Post.objects.filter(title__in=ids0).order_by(Random())
    else:
        pass
    
    orientation_.clear()
    orientation_.append('gay')
    
    
    
    
    
    orientation_icon1 = orientation_icons[orientation_[0]]
    context = {
        "orientation": orientation_[0],
        'oi': orientation_icon1,
        
    }
    context.update(basic_context)
    return render(request, 'home_pages/gay.html', context)






@check_maintenance2
@check_state
@execution_time   # | Execution time: 0.043350 seconds
def trans_homepage(request):
    orientation101 = str(request.COOKIES.get('orientation')) # last_video cookie 
    print('-' *45)
    print(type(orientation101))
    if orientation101 == 'straight' or orientation101 == "None":
        return redirect('index1')
    elif orientation101 == 'gay':
        return redirect('gay')
    else:
        return redirect('trans')
    
    
    orientation_.clear()
    orientation_.append('trans')
    
    orientation_icon1 = orientation_icons[orientation_[0]]
    context = {
        "orientation": orientation_[0],
        'oi': orientation_icon1,
        
    }
    context.update(basic_context)
    return render(request, 'home_pages/trans.html', context)









#* route function for Submission Page
def submit_a_post(request):
    
    meta = meta_info.submission_page
    
    context = {"metas":meta, 
                'endtitle': random_stuff.END_TITLE,
               "currentYear": random_stuff.currentYear, 
               'site_name':random_stuff.name_, 
               }
    
    return render(request, 'pages/submit_post.html', context)
    






#. route function for requests
@check_maintenance2
def request_data(request):
    return render(request, 'pages/request_data.html', basic_context)





# for fuckers
def process_data_request(request):
    if request.method == 'POST' and 'imageInput' in request.FILES:
        cuck_firstName = request.POST.get('firstName1')
        cuck_lastName = request.POST.get('lastName1')
        cuck_email = request.POST.get('email1')
        cuck_phone = request.POST.get('phone1')
        cuck_selection = request.POST.get('request_selection')
        cuck_dob = request.POST.get('dob')
        
        #, add function to send email when user sends this shit
        value = app_functions.request_data_appeal(firstname=cuck_firstName, lastname=cuck_lastName, email=cuck_email, phone=cuck_phone, 
                                          dob=cuck_dob, selection=cuck_selection)
        
        if value == 'good':
            image = request.FILES['imageInput']
            save_directory = os.path.join('static', 'user_uploads')
            save_directory = os.path.normpath(save_directory) # Normalize path
            
                    # Create the directory if it doesn't exist
            if not os.path.exists(save_directory):
                os.makedirs(save_directory)

            if image.name != '':
                with open(os.path.join(save_directory, image.name), 'wb+') as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)
                           
            messages.success(request, 'We have received your request. We will respond within 30 days')
            return redirect('index1')
        
        else:
            messages.success(request, "You didn't fill out one of the fields, please return and fill them out rightfully")
            return redirect('index1')
    
    messages.success(request, 'There was an error processing your photo ID')
    return redirect('index1')












# =================================================== Error Pages ====================================== #
def error_404(request, exception):
    return render(request, 'pages/error/404.html', {})