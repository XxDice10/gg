import sqlite3
import datetime
import time
from django.http import JsonResponse
import random
from website import app_functions
import time
import traceback


db_name = 'db.sqlite3'
table_name = 'website_post'
auth_users1 = 'auth_user'
table_name2 = 'website_members'




def execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print("Execution time: {:.6f} seconds".format(execution_time))
        return result
    return wrapper





# function that gets recommended videos from last video watched      
def index_recommendation(play_id):
    try:
        db = sqlite3.connect(db_name)
        with db:
            cur = db.cursor()
            cur.execute(f'SELECT tags FROM {table_name} WHERE play_id = ?', (play_id,))
            played_tags = str(cur.fetchall()[0][0]).split(';')

            tag_string = ','.join(['?' for _ in played_tags])

            # Execute a single query to fetch all IDs for the tags
            cur.execute(f"SELECT id FROM {table_name} WHERE tags IN ({tag_string})", played_tags)
            list_ids = cur.fetchall()


            return_list = [int(tag[0]) for tag in list_ids]
            
            return return_list
    except sqlite3.Error as e:
        print('Sqlite Error', e)
        traceback.print_exc()
        return 'error'
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        return ['error', e]
    finally:
        db.close()


index_recommendation('x7JMBnPW')