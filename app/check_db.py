import sqlite3
import datetime
import time
from django.http import JsonResponse
import random
from website import app_functions
import time
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


db_path = 'db.sqlite3'
table_name = 'website_post'
db_name = "misogynyDB.db"
auth_users1 = 'auth_user'
table_name2 = 'website_members'

last_time = []


def execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print("Execution time: {:.6f} seconds".format(execution_time))
        return result
    return wrapper




#. Function to create a new table within the main DB
def create_new_table(table):
    db = sqlite3.connect('misogynyDB.db')
    cur = db.cursor()
    cur.execute(f"""CREATE TABLE IF NOT EXISTS {table} 
                (id INTEGER PRIMARY KEY, 
                caption TEXT,
                tags TEXT,
                path TEXT
                )"""
                )
    db.commit()
    db.close()


#. List all the tables inside main DB
def list_tables_sqlite(database_name):
    conn = sqlite3.connect(database_name)
    cursor = conn.cursor()

    # Query to retrieve a list of all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    conn.close()

    table_names = [table[0] for table in tables]
    for i in table_names:
        print(i)


# Function to check all columns in a specified table
def check_columns_sqlite(database_name, table_name):
    conn = sqlite3.connect(database_name)
    cursor = conn.cursor()

    # Query to retrieve column information for the specified table
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()

    conn.close()

    if not columns:
        print(f"No columns found for table {table_name}")
    else:
        print(f"Columns for table {table_name}:")
        for column in columns:
            print(column[1])  # Column name is at index 1
            
        


#! function to drop table from db
def drop_table(db, table):
    print(f"Are you sure you want to drop table '{table}' from '{db}' ")
    print('=' * 45)
    print("y for yes | n for no")
    user_input = input("> ")
    
    if user_input == 'y':
        conn = sqlite3.connect(db)
        cursor = conn.cursor()
        cursor.execute(f"DROP TABLE {table}")
        conn.commit()
        conn.close()
        
        list_tables_sqlite(db)
    else:
        print('aborted...')
            
            
            
#. checking inside table
def selectingALL(db, name):
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {name}")
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    for i in result:
        print('-' * 45)
        print(i)
            
                    

def deleteFromTable(db, name):
    
    selectingALL(db_name, name)
    
    print()
    print('before deletion')
    print('-' * 45)
    
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM {name}")
    conn.commit()
    conn.close()

    print()
    print('before deletion')
    print('-' * 45)
    selectingALL(db_name, name)
            

t1 = 'posts'

def insert_post(caption, path, tags):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO posts (caption, tags, path) VALUES ('this bitch was slapped', 'slapped, forced, sexual', '/janan/aajn')")
    conn.commit()
    conn.close()
    





def checkingIfUserLikedPost(username, id):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute(f"SELECT likes FROM website_post WHERE id = ?", (id,))
    result = cursor.fetchall()
    conn.commit()
    conn.close()

    print(result)
    for i in result:
        a = str(i[0]).count(username)
        print('-' * 45)
        print(a)
        print('???', a)
        
        

k = """[{"model": "website.post", "pk": 2, "fields": {"title": "Slap a bitch Tuesday", "caption": "Women the worthless piece of shit keeps talking, give her a good slap", "comments": "0", "likes": "0", "mediaPath": "https://photos.app.goo.gl/m9NiJ8QR9r9QoUji9", "tags": "slapped, whore, cunt, forced sex", "mediaType": "gif"}}, {"model": "website.post", "pk": 1, "fields": {"title": "Watch These Whores Get Raped lol", "caption": "This is also a turn on but also funny af", "comments": "0", "likes": "masterd", "mediaPath": "\\static\\images\\test.MP4", "tags": "rape, sexual assault, sexual, sex, forced sex", "mediaType": "video"}}]"""




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




# username = models.CharField(max_length=255)
# user_ip = models.TextField(default='none')
# user_email = models.TextField(default='none')
# user_gender = models.TextField(default='none')
# user_birthday = models.TextField(default='none')
# is_premium = models.TextField(default='false')
# user_first_name = models.TextField(default='none')
# user_last_name = models.TextField(default='none')
# user_location = models.TextField(default='none')
# user_liked_posts = models.TextField(default='none')



#= return value 
# [('rape, sexual assault, sexual, sex, forced sex',), ('abuse, slapping, cunt',), ('rape, sex, abuse',), 
#  ('abuse, violent, black eye, picture',), ('hardcore, punching, abuse',)]

a = [" a", 'e', 'c', ' r']

name_ofPosts_table = 'website_post'





# returns this
#| [('4',), ('0',), ('0',), ('0',), ('1',), ('1',)]

def get_views_for_me():
    db = sqlite3.connect(db_path)
    cur = db.cursor()
    cur.execute(f"SELECT views FROM {table_name}")
    views = cur.fetchall()
    db.commit()
    db.close()
    
    print(views)
    

def get_views_for_user(username):
    if username == 'masterd':
        get_views_for_me()
    else:
        db = sqlite3.connect(db_path)
        cur = db.cursor()
        cur.execute(f"SELECT views FROM {table_name} WHERE submitted_by = ?", (username,))
        views = cur.fetchall()
        db.commit()
        db.close()
        
        allViews = []
        
        if views:
            for view in views:
                allViews.append(int(view[0]))
            return str(sum(allViews))
        else:
            return "No Videos"
            


import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()
from website import models
import traceback

db_name1 = 'db.sqlite3'
ab = 'website_post'


def find_similar_titles(target_title, titles, titles1, ):
    vectorizer = TfidfVectorizer()
    title_vectors = vectorizer.fit_transform(titles1)
    
    threshold = 0.15
    target_vector = vectorizer.transform([target_title])
    similarity_scores = cosine_similarity(target_vector, title_vectors)[0]
    print(title_vectors)
    similar_titles = [(titles[i], similarity) for i, similarity in enumerate(similarity_scores) if similarity > threshold]
    similar_titles.sort(key=lambda x: x[1], reverse=True)  # Sort similar titles by similarity score
    return_titles = [titlee[0] for titlee in similar_titles]
    return return_titles[:20]




# function that adds filler videos if recommendation is lacking
def filler_recommendation():
    pass


@execution_time
def standard_recommendation(last_video):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            # Combine the queries to fetch both by views and by likes in a single query
            cur.execute("""
                            SELECT id
                            FROM (
                                SELECT id, ROW_NUMBER() OVER (ORDER BY views DESC) AS view_rank,
                                        ROW_NUMBER() OVER (ORDER BY likes DESC) AS like_rank
                                FROM {}
                            ) AS subquery
                            WHERE view_rank <= 20 OR like_rank <= 20;

                        
                        """.format(ab, ab))
            
                        # Fetch the combined results
            combined_results = cur.fetchall()

            # Split the combined results into separate lists for views and likes
            by_views = [result[0] for result in combined_results]

            # cur.execute(f'SELECT title FROM {ab} LIMIT 1000')
            # meta_title = [video_title[0] for video_title in cur.fetchall()]
            # a = find_similar_titles('hot pretty teen slapped', meta_title, meta_title)
                
            # ids = [cur.execute(f'SELECT id FROM {ab} WHERE title = ?', (title,)).fetchone()[0] for title in a]
            
            return_list = list(set(by_views))
            return return_list
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
        

a = standard_recommendation('None')
print(a)
