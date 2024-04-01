from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sqlite3
import numpy as np
import traceback


vectorizer = TfidfVectorizer()




ab = 'website_post'
db_name1 = 'db.sqlite3'




def find_similar_titles(target_title, titles, titles1, ):

    title_vectors = vectorizer.fit_transform(titles1)
    
    threshold = 0.10
    target_vector = vectorizer.transform([target_title])
    similarity_scores = cosine_similarity(target_vector, title_vectors)[0]
    similar_titles = [(titles[i], similarity) for i, similarity in enumerate(similarity_scores) if similarity > threshold]
    similar_titles.sort(key=lambda x: x[1], reverse=True)  # Sort similar titles by similarity score
    return_titles = [titlee[0] for titlee in similar_titles]
    return return_titles[:8]
