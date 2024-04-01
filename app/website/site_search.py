from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, redirect
from .models import Post
from .decorators_ import check_state, check_maintenance2, maintenance
from .views import basic_context
import sqlite3

db_name = 'db.sqlite3'
name_ofPosts_table = 'website_post'
memebers = 'website_members'



#* banned search keywords
banned_keywords = [
    'rape',
    'cp',
    'child',
    'assult',
    'terrorism',
    'drug',
    'suicide',
    'radicalization',
    'bomb-making',
    'embezzlement',
    'prostitution',
    'genocide',
    'nigger',
    'nigga',
    'niglet',
    'chink',
    'white bitch',
    'white whore',
    'cracker',
    'kike',    
    'assassination',
    'gambling',
    'cartel',
    'narcotics',
    'blackmail',
    'racists',
    'forgery',
    'piracy',
    'rapist',
    'weapon',
    'fraud',
    'scam',
    'counterfeit',
    'killing',
    'exploitation',
    'murder',
    'dies',
    'death',
    'killed',
    'cut',
    'cutting',
]




# function to get list of IDs from search results
def search_videos(search_term):
    import traceback
    try:
        db = sqlite3.connect(db_name)
        with db:
            if search_term == 'ev':
                cur = db.cursor()
                cur.execute(f'SELECT id FROM {name_ofPosts_table} WHERE embedded != "True"')
                ev_results = cur.fetchall()
                r_list = [z[0] for z in ev_results]
                return r_list
            else:
                searchTerm = f"%{search_term}%"
                excluded = 'picture'
                cur = db.cursor()
                # search titles 
                sql_query = f"SELECT id FROM {name_ofPosts_table} WHERE title LIKE ? AND mediaType != ? LIMIT 1000"
                cur.execute(sql_query, (searchTerm, excluded))
                result1 = cur.fetchall()

                sql_query2 = f"SELECT id FROM {name_ofPosts_table} WHERE tags LIKE ? AND mediaType != ? LIMIT 1000"
                cur.execute(sql_query2, (searchTerm, excluded))
                result2 = cur.fetchall()
                
                combine_list = result1 + result2
                # setTurn = set(result2)
                final = []
                
                for i in combine_list:
                    final.append(i[0])

                return final
            
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




# function that checks search input value
def check_search_value(value):
    checks = []
    global result
    result = ''
    
    for keyword in banned_keywords:
        if keyword in str(value):
            checks.append('yes')
        else:
            checks.append('no')
            
    
    for check in checks:
        if check == 'yes':
            result = 'bad'
            break
        else:
            result = 'good'
        
    return result   















#* route function for Search Page
@check_state
def search(request, value):
    mainValue = str(value)
    input_check = check_search_value(mainValue)
    
    if input_check == 'bad':
        return redirect('search_warning')
    else:
        result = search_videos(str(value))
        
        num_of_results = len(result)
        
        videos = Post.objects.filter(id__in=result)
        
        # Define how many videos you want per page
        videos_per_page = 12
        # Create a Paginator object
        paginator = Paginator(videos, videos_per_page)
        # Get the current page number from the request, defaulting to 1
        page_number = request.GET.get('page', 1)
        try:
            # Get the videos for the requested page
            videos_page = paginator.page(page_number)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            videos_page = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            videos_page = paginator.page(paginator.num_pages)
        
        context = {
            "search_value":value,
            'number_of_results': num_of_results,
            'videos_page': videos_page
        }
        context.update(basic_context)
        
        
        
        if maintenance == True:
            return render(request, 'pages/maintenance.html', context)
        
        else:
            return render(request, 'pages/search.html', context)





@check_maintenance2
def search_warning(request):
    return render(request, 'pages/search-warning.html', basic_context)




#* route function for mobile search
def mobileSearch(request):
    if request.method == "POST":
        searchValue = request.POST.get('mobileSearchBar')
        
    
    context = {
        "searchResult": searchValue,
    }
    context.update(basic_context)
    return render(request, 'pages/search_results.html', context)