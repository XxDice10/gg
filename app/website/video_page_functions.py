import sqlite3
from django.http import JsonResponse, HttpResponse
from . import app_functions, views
from django.contrib import messages
import traceback
from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
import random
from .decorators_ import check_state, check_maintenance2, execution_time

main_url = "http://127.0.0.1:8000"

db_name = "misogynyDB.db"
db_path = 'db.sqlite3'
auth_users1 = 'auth_user'
members = 'website_members'
the_posts = 'website_post'



def login_required3(func):
    def wrapper(request):
        if request.user.is_authenticated:
            return func(request)
        else:
            messages.success(request, 'You must be logged in to view that page.')
    return wrapper



# ==================================== outside sources calling module ========================================== #

def has_user_liked_video(video_id, username):
    try:
        db = sqlite3.connect(db_path)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT likes FROM {members} WHERE username = ?", (username,))
            list_video = str(cur.fetchall())
    except sqlite3.Error as e:
        print("SQLite error in 'update_user_likes' function:", e)
    except Exception as e:
        print("An error occurred in 'update_user_likes' function:", e)
    finally:
        db.close()  




# fucntion that gets the video title for the current playing video
def get_video_title(play_id):
    try:
        play_id = str(play_id)
        db = sqlite3.connect(db_path)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT title FROM {the_posts} WHERE play_id = ?",(play_id, ))
            video_title = cur.fetchall()[0][0]
            return video_title
    except sqlite3.Error as e:
        print("SQLite error in 'update_user_likes' function:", e)
        traceback.print_exc()
    except Exception as e:
        print("An error occurred in 'update_user_likes' function:", e)
        traceback.print_exc()
    finally:
        db.close()  



def get_video_into(play_id):
    try:
        play_id = str(play_id)
        db = sqlite3.connect(db_path)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT * FROM {the_posts} WHERE play_id = ?",(play_id, ))
            video_title = cur.fetchone()
            return video_title
    except sqlite3.Error as e:
        print("SQLite error in 'update_user_likes' function:", e)
        traceback.print_exc()
    except Exception as e:
        print("An error occurred in 'update_user_likes' function:", e)
        traceback.print_exc()
    finally:
        db.close()  
    






# ========================================== adding view to video ============================================== #

# function that adds view to videos
def add_view(view_count, id):
    try:
        db = sqlite3.connect(db_path)
        with db:
            
            cursor = db.cursor()
            
            updated_view_count = str(int(view_count) + 1)
            cursor.execute(f'UPDATE {the_posts} SET views = ? WHERE id = ?', (updated_view_count, id))
            db.commit()
            
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







# ===================================== When user comments on a video ========================================= #  


# function that adds a comment to a video
def new_comment(comment, video_id):
    try:
        db = sqlite3.connect(db_path)
        with db:
            cur = db.cursor()
            
            sql_query = f"UPDATE {the_posts} SET comments = ? WHERE video_id = ?"
    
            cur.execute(sql_query, (comment, video_id))
            db.commit()
            
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        return 'error'
    except Exception as e:
        print("An error occurred:", e)
        return ['error', e]
    finally:
        db.close()
        


# function that handles frontend request
def adding_new_comment(request):
    if request.method == "POST":
        comment_value = request.POST.get('comment_value')
        video_id = request.POST.get('video_id')
        username = str(request.user.username)
        
        new_comment = f"{username}|{comment_value};"
        
        new_comment(new_comment, video_id)
        
    boom='re'
    return HttpResponse('Received data: {}'.format(boom))









# ===================================== user likes or dislikes a video ========================================= #  
    
    
# function used for when a user likes a video
def video_liked(request):
    if request.method == "POST":
        play_id = request.POST.get('video_id')
        post = get_object_or_404(Post, play_id=play_id)
        
        if post.main_likes.filter(id=request.user.id):
            post.main_likes.remove(request.user)
            
        else:
            post.main_likes.add(request.user)
            post.dislikes.remove(request.user)
    
    boom='re'
    return HttpResponse('Received data: {}'.format(boom))



# function used for when a user dislikes a video
def video_unliked(request):
    if request.method == "POST":
        play_id = request.POST.get('video_id')
        post = get_object_or_404(Post, play_id=play_id)
        if post.dislikes.filter(id=request.user.id):
            post.dislikes.remove(request.user)
            
        else:
            post.dislikes.add(request.user)
            post.main_likes.remove(request.user)
    
    boom='re'
    return HttpResponse('Received data: {}'.format(boom))












#, MAIN FUNCTION
# ===================================== video url function ========================================= #  

#, check this out, SELECT * FROM 200k plus?????
# function that is used to select a random video for user
def tryingTheirLuck():
    try:
        db = sqlite3.connect(db_path)
        with db:
            cur = db.cursor()

            cur.execute(f"SELECT * FROM {the_posts} ORDER BY RANDOM() LIMIT 1")
            random_row = cur.fetchone()

            random_id = random_row[0]
            filtered_posts = Post.objects.filter(id=random_id)
            title = random_row[1]
            num_of_comments = random_row[3]
            view_count = random_row[9]
            
            return filtered_posts, random_id, title, num_of_comments, view_count

    except sqlite3.Error as e:
        print("SQLite error in 'update_user_likes' function:", e)
        traceback.print_exc()
    except Exception as e:
        print("An error occurred in 'update_user_likes' function:", e)
        traceback.print_exc()
    finally:
        db.close()  




# route for recommendeding video
def recommended_videos(title):
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    # selecting all videos that is not the current video being watched
    cur.execute(f"SELECT * FROM {the_posts} WHERE (mediaType = 'video-l' OR mediaType = 'video-w') AND play_id != ?", (title,))
    result = cur.fetchall()
    db.commit()
    db.close()
    
    IDs = []
    
    for i in result:
        IDs.append(i[0])
        
    # Fetch all posts and then randomize the order
    filtered_posts = Post.objects.filter(id__in=IDs)

    return filtered_posts






#* route function for video play page
@check_state
@execution_time
def video(request, play_id):
    
    if views.maintenance == True:
        return render(request, 'pages/maintenance.html', {})
    
    else:
        # if user presses "Try Your Luck Button"
        if play_id == "?":
                        
            video_play = tryingTheirLuck() # getting a random video to show
            
            query_post = video_play[0] # the random video that is query for posts
            
            video_id = video_play[1] # video id of random video
            
            
            video_title = video_play[2] # title of the video
            
            num_ofComments = video_play[3] # number of comments
            
            view_count = video_play[4]
            add_view(view_count, video_id) # adding a view to said video
            
            context = {
                'video_play_id': play_id,
                'posts':query_post,
                "video_title": video_title,
                "num":num_ofComments
                }
            context.update(views.basic_context)
            return render(request, 'pages/video.html', context)
        
        
        
        
        
        # if user didn't press "Try Your Luck Button"
        else:
            video_play = Post.objects.filter(play_id__exact=play_id)
            
            video_into = get_video_into(play_id)
            video_id2 = video_into[0]
            video_title = video_into[1]
            view_count = video_into[9]
            num_ofComments = video_into[3]
            
            add_view(view_count, video_id2)
            
            context = {
                'video_play_id': video_id2,
                'posts':video_play,
                "video_title": video_title,
                "num":num_ofComments
                }
            context.update(views.basic_context)
            return render(request, 'pages/video.html', context)