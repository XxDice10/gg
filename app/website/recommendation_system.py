
import sqlite3
import traceback
import numpy as np
import datetime
from . import sklearn_recommendation







ab = 'website_post'
db_name1 = 'db.sqlite3'

main_target = "hot pretty teen slapped"


def standard_recommendation(last_video):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            last_video = str(last_video)
            
            # getting title from play_id
            query = 'SELECT title FROM {} WHERE id = ? LIMIT 1'.format(ab)
            cur.execute(query, (last_video,))
            target_title = cur.fetchone()[0]
            
            # getting the 1000 videos
            query1 = 'SELECT title FROM {} LIMIT 1005'.format(ab)
            cur.execute(query1)
            titles_list = [title[0] for title in cur.fetchall()]
            
            IDs = sklearn_recommendation.find_similar_titles(target_title, titles_list, titles_list)

            return IDs
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
        

def trending_videos():
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            # Calculate the timestamp for 24 hours ago
            twenty_four_hours_ago = datetime.datetime.now() - datetime.timedelta(hours=24)

            # Execute the query
            cur.execute('SELECT id FROM {} WHERE timestamp >= ? ORDER BY views DESC LIMIT 8'.format(ab), (twenty_four_hours_ago,))
            # Fetch the results directly into a list comprehension
            by_views = [view_id[0] for view_id in cur.fetchall()]
                        
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
        



def most_liked_videos():
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            # Calculate the timestamp for 24 hours ago
            twenty_four_hours_ago = datetime.datetime.now() - datetime.timedelta(hours=24)

            # Execute the query
            cur.execute('SELECT id FROM {} WHERE timestamp >= ? ORDER BY likes DESC LIMIT 8'.format(ab), (twenty_four_hours_ago,))
            # Fetch the results directly into a list comprehension
            by_views = [view_id[0] for view_id in cur.fetchall()]
                        
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
        
        
        
def exclusives():
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
        

            # Execute the query
            cur.execute('SELECT id FROM {} WHERE embedded != "True" ORDER BY views DESC LIMIT 8'.format(ab))
            # Fetch the results directly into a list comprehension
            by_views = [view_id[0] for view_id in cur.fetchall()]
                        
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