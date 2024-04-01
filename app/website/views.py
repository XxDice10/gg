from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, redirect
from .models import Post
from django.db.models import Q
from . import app_functions, meta_info, recommendation_system
import os
from django.contrib import messages
from django.conf import settings
from . import random_stuff
from .decorators_ import check_maintenance2, check_state, execution_time
import sqlite3
import traceback
from django.http import HttpResponse
from django.db.models.functions import Random

# Create your views here.

#. turn to True to set site maintenance to True
maintenance = False 

#. Is server live 
server_live = False


#. path to db
db_name1 = 'db.sqlite3'
#. table name 
ab = 'website_post'


#. orientation 
orientation_ = ["straight"]

orientation_icons = {"gay":"fa-solid fa-venus-double", 'straight': 'fa-solid fa-venus', 'trans': 'fa-solid fa-transgender'}



def get_target_title(play_id):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            cur.execute(f'SELECT title FROM {ab} WHERE play_id = ?', (play_id,))
            target_title = cur.fetchone()[0]
            print(target_title)
            return target_title
        
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        traceback.print_exc()
        return 'error'
    except Exception as e:
        print()
        print('='*45)
        print("An error occurred:", e)
        traceback.print_exc()
        return ['error', e]
    finally:
        db.close()
        

def index_recommendation(play_id):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            try:
                cur.execute(f'SELECT tags FROM {ab} WHERE play_id = ?', (play_id,))
                
                played_tags = str(cur.fetchall()[0][0]).split(';')
                
                #Collect all tags
                tag_conditions = " OR ".join([f"tags LIKE '%{tag}%'" for tag in played_tags])

                # Execute a single SQL query to fetch results for all tags
                cur.execute(f"SELECT id FROM {ab} WHERE {tag_conditions} ORDER BY views DESC LIMIT 1000")

                # Fetch all results at once
                things = cur.fetchall()

                # Extract IDs from the fetched results
                IDs = [id[0] for id in things]

                return IDs
            except:
                print('shitttee')
        
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        traceback.print_exc()
        return 'error'
    except Exception as e:
        print()
        print('='*45)
        print("An error occurred:", e)
        traceback.print_exc()
        return ['error', e]
    finally:
        db.close()







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
    'ddd': random_stuff.ddd
}





#* route function for Index Page
@check_maintenance2
@check_state
@execution_time   # | Execution time: 0.043350 seconds
def index1(request):
    # =============== starter variables ================ #

    last_video = str(request.COOKIES.get('last_videoCookie')) # last_video cookie 
    print('.'*45)
    print(f'last_video = {last_video}')
    
    videos0 = []
    if last_video != "None" and last_video != '1':
        ids0 = recommendation_system.standard_recommendation(last_video)
        videos0 = Post.objects.filter(title__in=ids0).order_by(Random())
        print('8' *34)
        print(videos0)
    else:
        pass
    
    orientation_.clear()
    orientation_.append('straight')
    
    meta = meta_info.index_page # getting meta info for index page
    
    # Trending videos
    ids = recommendation_system.trending_videos()
    videos = Post.objects.filter(id__in=ids).order_by(Random())
    
    # Most Liked
    ids1 = recommendation_system.most_liked_videos()
    videos1 = Post.objects.filter(id__in=ids1).order_by(Random())
    
    
    # Get exclusives
    ids3 = recommendation_system.exclusives()
    videos2 = Post.objects.filter(id__in=ids3).order_by(Random())


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
    context = {
        
    }
    context.update(basic_context)
    return render(request, 'home_pages/gay.html', context)






@check_maintenance2
@check_state
@execution_time   # | Execution time: 0.043350 seconds
def trans_homepage(request):
    context = {
        
    }
    context.update(basic_context)
    return render(request, 'home_pages/trans.html', context)



        
def change_orientation(request, orientation):
    # Set the orientation in the cookie
    global orientation_
    orientation_.clear()
    orientation_.append(orientation)

    return redirect('index1')












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