
import sqlite3
import traceback
import datetime
from . import sklearn_recommendation



ab = 'website_post'
db_name1 = 'db.sqlite3'



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
        

    
def get_sub_videos():
    db_name1 = 'db.sqlite3'
    ab = 'website_post'
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            # Calculate the timestamp for 24 hours ago
            twenty_four_hours_ago = datetime.datetime.now() - datetime.timedelta(hours=24)

            # getting videos by highest views within 24 hours
            cur.execute('SELECT id FROM {} WHERE timestamp >= ? ORDER BY views DESC LIMIT 8'.format(ab), (twenty_four_hours_ago,))
            by_views = [view_id1[0] for view_id1 in cur.fetchall()]
                   
            # getting videos by highest likes within 24 hours
            cur.execute('SELECT id FROM {} WHERE timestamp >= ? ORDER BY likes DESC LIMIT 8'.format(ab), (twenty_four_hours_ago,))
            by_likes = [view_id2[0] for view_id2 in cur.fetchall()]  
            
            # getting exclusives
            cur.execute('SELECT id FROM {} WHERE embedded != "True" ORDER BY views DESC LIMIT 8'.format(ab))
            by_exs = [view_id3[0] for view_id3 in cur.fetchall()]
            
            return by_views, by_likes, by_exs
    except sqlite3.Error as e:
        traceback.print_exc()
        return 'error'
    except Exception as e:
        traceback.print_exc()
        return ['error', e]
    finally:
        db.close()    
        
        
