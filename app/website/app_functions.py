import sqlite3
import smtplib
from . import random_stuff
import traceback
import random


db_name = 'db.sqlite3'
name_ofPosts_table = 'website_post'
memebers = 'website_members'




def query(data, searchTerm):
    
    numberOfPosts = f"- {len(data)} Total Posts with '{searchTerm}'"
    tags = []
    tags1 = []
    
    for i in data:
        tags.append(i[5])
    
    for a in tags:
        e = str(a).split(',')
        for q in e:
            tags1.append(str(q).strip())
    
    unique_e = list(set(tags1))
    finalTags = []
    
    for t in unique_e:
        if str(t).count(searchTerm):
            finalTags.append(t)
    
    return numberOfPosts, finalTags



def send_email(message, subject1):
    my_pass ="ovjjnqqoancxhiea"
    my_email = "kirko190255@gmail.com"
    receiver = "supersweet098@gmail.com" # TODO change to os after restart


    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        smtp.login(my_email, my_pass)
        subject = subject1
        body = message

        msg = f"Subject: {subject}\n\n{body}"

        smtp.sendmail(my_email, receiver, msg)



def userLikePost(username, id):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute(f"UPDATE website_post SET likes = ? where id = ?", (str(username), id))
    conn.commit()
    conn.close()




def anotherUserLiked(username, id):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("SELECT likes FROM website_post WHERE id = ?", (id,))
    result = str(cursor.fetchall()[0][0]).split(',')
    conn.commit()
    conn.close()
    
    zeroBased = result[0]
    likedUsers = []
    
    for user in zeroBased:
        likedUsers.append(user)
    
    likedUsers.append(str(username))
    newLikes = ','.join(likedUsers)
    
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("UPDATE website_post SET likes = ? WHERE id = ?", (newLikes, id))

    conn.commit()
    conn.close()



# function that returns a list of all of the tags for users to choose from
def select_tags() -> list:
    """function that gets all the tags for a user to choose from

    Returns:
        list: all the tags
    """
    db = sqlite3.connect(db_name)
    cur = db.cursor()
    cur.execute('SELECT tags FROM website_post')
    result = cur.fetchall()
    db.commit()
    db.close()
    
    all_tags = []
    
    for i in result:
        all_tags.append(str(i).replace(')', "").replace('(', ""))
    
    newList = ''.join(all_tags).replace("'", '').split(';')
    
    final_tags = []
    
    for tag in newList:
        if tag == '':
            pass
        else:  
            e = str(tag).strip()
            final_tags.append(e)

    listSet = set(final_tags)
    
    final = []
    
    for newTag in listSet:
        z = f'<a href="/search/{newTag}">{newTag.title()}</a>'
        final.append(z)

   
    j = ''.join(final)
    return j




def checkingIfUserLikedPost(username, id):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("SELECT likes FROM website_post WHERE id = ?", (id,))
    result = str(cursor.fetchall()[0][0]).split(',')
    conn.commit()
    conn.close()

    zeroBased = result[0]
    
    if zeroBased == '0':
        userLikePost(username, id)
    else:
        anotherUserLiked(username, id)
        
        
        


def get_video_title(id):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT mediaPath from website_post WHERE id = ?', (id,))
    result = str(cursor.fetchall()[0][0]).split('\\')
    conn.commit()
    conn.close()
    end = len(result) - 1
    result1 = result[end]
    return result1




#* app function that checks if the user a Premium member
def checkPremiunStatus(username:str) -> bool:
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT is_premium from website_members WHERE username = ?', (username,))
    result = cursor.fetchall()[0][0]
    conn.commit()
    conn.close()
    
    if result == None:
        return False
    else:
        return True

        

# function that sends to me when user contacts
def contact_send_email(firstname, email, phone, message):
    pass


# function that sends me a email knowing a stupid user wants their data
def request_data_appeal(firstname, lastname, email, phone, dob, selection):
    #* message for if a cuckold bitch wants their data
    message1 = f"""
    Cuck Name: {firstname} {lastname}\n
    Cuck Email: {email}\n
    Cuck Phone: {phone}\n
    Cuck DOB: {dob}\n\nCuck wants their data {selection}
    """
    if str(phone).isdigit():
        send_email(message1)
        return 'good'
    else:
        return 'bad'

           


    
    

# function that grabs the current users uploads
def get_user_uploads(username):
    username = str(username)
    db = sqlite3.connect(db_name)
    cur = db.cursor()
    cur.execute(f"SELECT id FROM {name_ofPosts_table} WHERE submitted_by = ? AND mediaType != 'picture' ", (username,))
    views = cur.fetchall()
    db.commit()
    db.close()
    
    content_ids = []
    
    for i in views:
        content_ids.append(i[0])
        
    return content_ids



# function that grabs the current users picture uploads
def get_user_pictures(username):
    username = str(username)
    db = sqlite3.connect(db_name)
    cur = db.cursor()
    cur.execute(f"SELECT id FROM {name_ofPosts_table} WHERE submitted_by = ? AND mediaType NOT LIKE '%video%' ", (username,))
    views = cur.fetchall()
    db.commit()
    db.close()
    
    content_ids = []
    
    for i in views:
        content_ids.append(i[0])
        
    return content_ids
     



# function that generates a random id number for video
def generate_random_id():
    import random
    import string
    
    characters = string.ascii_letters + string.digits
    random_id = ''.join(random.choice(characters) for _ in range(8))
    return random_id



# function that grabs the video data for user who wants to edit
def get_edit_video(id):
    db = sqlite3.connect(db_name)
    cur = db.cursor()
    cur.execute(f"SELECT * FROM {name_ofPosts_table} WHERE id = ?", (id,))
    views = cur.fetchall()
    db.commit()
    db.close()
        
    return views





# function that gets the users infomation to for them to edit
def get_user_info(username):
    db = sqlite3.connect(db_name)
    cur = db.cursor()
    cur.execute(f"SELECT * FROM {memebers} WHERE username = ?", (username,))
    views = cur.fetchall()
    db.commit()
    db.close()

    return views




# function to grab all comments for certain video
def get_comments(play_id):
    try:
        db = sqlite3.connect(db_name)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT comments FROM {name_ofPosts_table} WHERE play_id = ?",(play_id, ))
            views = cur.fetchall()[0][0]
            print('-'*45)
            print(views)
    
            comments = str(views).split(',')
            e_comments = []
            for i in comments:
                if i == '':
                    pass
                else:
                    e_comments.append(str(i).lstrip())

            return e_comments
        
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








# function that adds a view for when a user visits a profile page for a different user
def add_profile_view(username):
    try:
        db = sqlite3.connect(db_name)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT profile_views FROM {memebers} WHERE username = ?", (username,))
            views = str(cur.fetchall()[0][0])
            if views == 'none' or views == "None" or views == None:
                views = '1'
            else:
                views = str(int(views) + 1)
            cur.execute(f"UPDATE {memebers} SET profile_views = ? WHERE username = ?", (views, username))
            db.commit()
            
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        return 'error'
    except Exception as e:
        print("An error occurred:", e)
        return ['error', e]
    finally:
        db.close()
     
     
     
        
def userUnlike(username, id):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute(f"SELECT likes FROM website_post WHERE id = ?", (id,))
    result = str(cursor.fetchall()[0][0])
    conn.commit()
    conn.close()
    
    updatedLikes = []
    
    for i in result.split(','):
        if i == str(username):
            pass
        else:
            updatedLikes.append(i)
    
    updatedLikes2 = ','.join(updatedLikes)
    
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("UPDATE website_post SET likes = ? WHERE id = ?", (updatedLikes2, id))
    conn.commit()
    conn.close()
    
    
    
    
    
# function that gets the total views of all of a users uploads
def get_all_user_video_upload_views(username):
    try:
        db = sqlite3.connect(db_name)
        with db:
            cur = db.cursor()
            cur.execute(f"SELECT views FROM {name_ofPosts_table} WHERE submitted_by = ?", (username,))
            views = cur.fetchall()
            
            views_list = [int(i[0]) for i in views]
            
            return sum(views_list)
            
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        return 'error'
    except Exception as e:
        print("An error occurred:", e)
        return ['error', e]
    finally:
        db.close()
        
        
