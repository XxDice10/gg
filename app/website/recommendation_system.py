
import sqlite3
import traceback
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity




ab = 'website_post'
db_name1 = 'db.sqlite3'

main_target = "hot pretty teen slapped"

vectorizer = TfidfVectorizer()


# function that gets 10 similar tiltes
def find_similar_titles(target_title, titles, titles1, ):
    try: 
        title_vectors = vectorizer.fit_transform(titles1)
        
        threshold = 0.25
        target_vector = vectorizer.transform([target_title])
        similarity_scores = cosine_similarity(target_vector, title_vectors)[0]
        # print(similarity_scores)
        similar_titles = [(titles[i], similarity) for i, similarity in enumerate(similarity_scores) if similarity > threshold]
        similar_titles.sort(key=lambda x: x[1], reverse=True)  # Sort similar titles by similarity score
        return_titles = [titlee[0] for titlee in similar_titles]
        return return_titles[:10]
    except:
        return '?'



def last_bit(main_q, last_video):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            ids = []
            
            if last_video != "None":
                cur.execute('SELECT title FROM {} LIMIT 1000'.format(ab))
                
                meta_title = [video_title[0] for video_title in cur.fetchall()]
                
                a = find_similar_titles(last_video, meta_title, meta_title)
                if a == "?":
                    pass
                else:
                    ids = [cur.execute(main_q, (title,)).fetchone()[0] for title in a]
                
            else:
                cur.execute('SELECT title FROM {} LIMIT 1000'.format(ab))
                meta_title = [video_title[0] for video_title in cur.fetchall()]
                a = find_similar_titles(main_target, meta_title, meta_title)
                if a == "?":
                    pass
                else:
                    ids = [cur.execute(main_q, (title,)).fetchone()[0] for title in a]
                
            return ids
                
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
        
        

def standard_recommendation(last_video):
    try:
        db = sqlite3.connect(db_name1)
        with db:
            cur = db.cursor()
            
            # by views
            cur.execute('SELECT id FROM {} ORDER BY views DESC LIMIT 20'.format(ab))
            # Fetch the results directly into a list comprehension
            by_views = [view_id[0] for view_id in cur.fetchall()]
            
            
            # most liked
            cur.execute('SELECT id FROM {} ORDER BY likes DESC limit 20'.format(ab))
            by_likes = [like_id[0] for like_id in cur.fetchall()]
                        
            
            main_query1 = 'SELECT id FROM {} WHERE title = ?'.format(ab)
            ids = last_bit(main_query1, last_video)
            
            return_list = list(set(by_views + by_likes + ids))
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
        
        
