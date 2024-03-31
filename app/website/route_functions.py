import sqlite3
from django.http import JsonResponse, HttpResponse
from . import app_functions
from django.contrib import messages

main_url = "http://127.0.0.1:8000"

db_name = "misogynyDB.db"
db_path = 'db.sqlite3'
auth_users1 = 'auth_user'
members = 'website_members'
the_posts = 'website_post'



def search_query(request):
    term = request.GET.get('search_term', '')
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()

    # Use multiple LIKE conditions for each column
    cursor.execute("SELECT * FROM website_post WHERE caption LIKE ? OR tags LIKE ?", ('%' + term + '%', '%' + term + '%'))

    result = cursor.fetchall()

    conn.commit()
    conn.close()


    a = app_functions.query(result, term)
    
    
    data = {'data': a}
    return JsonResponse(data)




# function that updates a new comment
def adding_new_comment(request):
    if request.method == "POST":
        new_comment = request.POST.get('comment_value')
        username = request.user.username
        video_id = request.POST.get('video_id')

        db = sqlite3.connect(db_path)
        cur = db.cursor()
        cur.execute(f'SELECT comments FROM {the_posts} WHERE play_id = ?', (video_id,))
        all_comments = cur.fetchall()[0][0]
        db.commit()
        db.close()
        
        comments = str(all_comments).split(',')
        e_comments = []
        for i in comments:
            if i == '':
                pass
            else:
                e_comments.append(str(i).lstrip())
                
        new_comment1 = f"{username}-{new_comment},"
        main_comment = "".join(new_comment1)
        
        db = sqlite3.connect(db_path)
        cur = db.cursor()
        cur.execute(f"UPDATE {the_posts} SET comments = ? WHERE play_id = ?", (main_comment, video_id))
        db.commit()
        db.close()
    
        
    
    boom='re'
    return HttpResponse('Received data: {}'.format(boom))



def userLikedPost(request):
    if request.method == "POST":
        username = request.POST.get('username')
        post_id = request.POST.get('post_id')
        result = app_functions.checkingIfUserLikedPost(username, post_id)
        
    
    boom=''
    return HttpResponse('Received data: {}'.format(boom))
         
         

# BUG is due to html id tags, id should have id of post at end
         
     


def retrieve_tags(request):
    
    new = app_functions.select_tags()
    
    data = {'key': new}

    # Return the data as JSON response
    return JsonResponse(data)

        
        
     
     
# function that updates the members db
def members_db_update(gender, email1, username1, dob, names, pd, current_user):
    # getting id for old username
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    cur.execute(f'SELECT id FROM {members} WHERE username = ?', (current_user,))
    user_id = int(cur.fetchall()[0][0])
    db.commit()
    db.close()    
    
    both_names = str(names).split(' ')
    fname = str(both_names[0]).title()
    lname = str(both_names[1]).title()
    
    
    # updating the rest of the user information
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    cur.execute(f"""
                UPDATE {members} SET 
                user_gender = ?, 
                user_email = ?,
                username = ?,
                user_birthday = ?,
                user_last_name = ?,
                user_first_name = ?,
                profile_description = ?
                WHERE id = ?
                """, (gender, email1, username1, dob, lname, fname, pd, user_id))

    db.commit()
    db.close()
     

     
# function that updates user profile information
def update_user_infomation(username, email, gender, dob, names, pd, current_user, current_email):
    username1 = ''
    if str(username) == str(current_user):
        username1 = current_user
    else:
        username1 = username

    email1 = ''
    if str(current_email) == str(email):
        email1 = current_email
    else:
        email1 = email
    
    # updating auth_user db    
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    cur.execute(f"SELECT id FROM {auth_users1} WHERE username = ?", (current_user,))
    user_id = cur.fetchall()[0][0]
    cur.execute(f'UPDATE {auth_users1} SET email = ? WHERE id =?', (email1, user_id))
    cur.execute(f'UPDATE {auth_users1} SET username = ?  WHERE id =?', (username1, user_id))
    db.commit()
    db.close()
    
    
    members_db_update(gender=gender, 
                      email1=email1, 
                      username1=username1, 
                      dob=dob, 
                      names=names,
                      pd=pd,
                      current_user=current_user,
                      )
    

    


# when users update their info
def user_updates_profile(request):
    if request.method == "POST":
        username = request.POST.get('update_username')
        email = request.POST.get('update_email')
        gender = request.POST.get('update_gender')
        dob = request.POST.get('update_dob')
        names = request.POST.get('update_names')
        pd = request.POST.get('update_pd')
        
        # current username
        current_user = str(request.user)
        
        # getting email from db
        db = sqlite3.connect(db_path)
        cur = db.cursor()
        cur.execute('SELECT email FROM auth_user WHERE username = ?', (current_user,))
        current_email = cur.fetchall()[0][0]
        db.commit()
        db.close()
        
        
        update_user_infomation(username, email, gender, dob, names, pd, current_user, current_email)
    
    boom='re'
    return HttpResponse('Received data: {}'.format(boom))
        


# function to get comment data
def get_comment_data(request):
    if request.method == "POST":
        video_id = str(request.POST.get("video_id"))
        
        db = sqlite3.connect(db_path)
        cur = db.cursor()
        cur.execute(f"SELECT comments FROM {the_posts} WHERE play_id = ?", (video_id,))
        views = cur.fetchall()[0][0]
        db.commit()
        db.close()
        
        comments = str(views).split(',')
        e_comments = []
        for i in comments:
            if i == '':
                pass
            else:
                e_comments.append(str(i).lstrip())
                
        first_ten = e_comments[:10]
        url = main_url
        return_comments = []

        for i in first_ten:
            user = i.split('-')[0]
            comment = i.split('-')[1]
            main_ = f"""<div class="comment-section" ><a href="/users/profile/{user}">{user.title()}</a><p>{comment}</p></div>"""
            return_comments.append(main_)
        for_js = "".join(return_comments)
        
                
        data = {'key': for_js}

        # Return the data as JSON response
        return JsonResponse(data)

         
         
         
         
def userunLikedPost(request):
    if request.method == "POST":
        username = request.POST.get('username')
        post_id = request.POST.get('post_id')
        app_functions.userUnlike(username, post_id)


    boom='re'
    return HttpResponse('Received data: {}'.format(boom))
    
    
