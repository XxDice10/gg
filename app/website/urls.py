from django.urls import path, include
from . import views, route_functions, video_page_functions, legal_routes, vistior_session_stuff, site_search




urlpatterns = [
    #| normal pages
    path('', views.index1, name='index1'),
    path('search/<str:value>/', site_search.search, name='search'),
    path('submission/', views.submit_a_post, name='submission'),
    path('video/<str:play_id>/', video_page_functions.video, name='video'),
    path('search_warning/', site_search.search_warning, name='search_warning'),
    path('search_results/', site_search.mobileSearch, name='mobileSearch'),
    
    
    
    
    #, home pages
    path('gay/', views.gay_homepage, name='gay'),
    path('trans/', views.trans_homepage, name='trans'),
    

    
    # = Legal
    path('notice/', legal_routes.notice, name='notice'),
    path('privacy_policy/', legal_routes.privacy_policy, name='privacy_policy'),
    path('request_data/', views.request_data, name='request_data'),
    path('terms-of-use/', legal_routes.termsOfUse, name='termsOfUse'),
    path('DMCA/', legal_routes.DMCA, name='DMCA'),
    path('law_2257/', legal_routes.law_2257, name='law_2257'),
    path('faq/', legal_routes.faq, name='faq'),
    path('DMCA_takedown/', legal_routes.DMCA_takedown, name='DMCA_takedown'),
    path('help_improve/', legal_routes.help_improve, name="help_improve"),
    path('parental_controls/', legal_routes.parental_controls, name='parental_controls'),
    path('dmca_takedown_submission/', legal_routes.dmca_takedown_submission, name='dmca_takedown_submission'),
    path('contact_us/', legal_routes.contact_us, name='contact_us'),
    path('contact_form_submitted/', legal_routes.contact_form_submitted, name='contact_form_submitted'),
    
    
    
    
    
    
    #1 route functions
    #. route function for the search query when user types in search box
    path('search_query/', route_functions.search_query, name='search_query'),
    
    
    path('userLikedPost/', route_functions.userLikedPost, name='userLikedPost'),
    path('userunLikedPost/', route_functions.userunLikedPost, name='userunLikedPost'),
    
    
    # path('load_more_posts/', views.load_more_posts, name='load_more_posts'),
    # path('download_video/<str:video_id>/', views.download_video, name='download_video'),
    path('retrieve_tags/', route_functions.retrieve_tags, name='retrieve_tags'),
    path('process_data_request/', views.process_data_request, name='process_data_request'),
    path('user_updates_profile/', route_functions.user_updates_profile, name='user_updates_profile'),
    
    
    
    #, video page functions
    
    path('get_comment_data/', route_functions.get_comment_data, name='get_comment_data'),
    path('video_liked/', video_page_functions.video_liked, name='video_liked'),
    path('video_unliked/', video_page_functions.video_unliked, name='video_unliked'),
    path('adding_new_comment/', video_page_functions.adding_new_comment, name="adding_new_comment"),
    
    
    
    #. vistor session functions
    path('new_vistor/', vistior_session_stuff.new_vistor, name='new_vistor'),
    path('state_protest/', vistior_session_stuff.state_protest, name='state_protest'),
    
]

