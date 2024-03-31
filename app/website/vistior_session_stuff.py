import requests
import os
from . import app_functions
from ipware import get_client_ip
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse





def do_something():
    pass


exed_states = [
    "Texas"
]


user_state = ''

# getting IP infomation from user when user comes to site
def get_location(ip):
    # url = f"https://ip-geo-location.p.rapidapi.com/ip/{ip}"
    # querystring = {"format": "json"}
    # headers = {
    #     "X-RapidAPI-Key": "751db66893mshf0b8e0c2f0b9f07p171a45jsnab3bc91123a0",
    #     "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    # }
    # response = requests.get(url, headers=headers, params=querystring)

    # # Check if the request was successful
    # if response.status_code == 200:
    #     # Print the content of the response
    #     ja = response.json()  # or response.text for raw text
    # else:
    #     app_functions.send_email(response.status_code, 'Request failed with status code:')
        
        
    # ip_ = ja['ip']
    # ip_type = ja['type']
    # lat_long = [ja['location']['latitude'], ja['location']['longitude']]
    # postcode = ja['postcode']
    # area = ja['area']['name']
    # asn_num = ja['asn']['number']
    # asn_provider = ja['asn']['organisation']
    # city = ja['city']['name']
    # country = ja['country']['name']
    # security = ja['security']
    
    # do_something()
    area = 'Washington'
    
    if area in exed_states:
        return 'bad', area
    else:
        return 'good'
    
    

# backend function that executes when user first arrives on site
def new_vistor(request):
    # getting user IP
    client_ip, _ = get_client_ip(request)
    # IP and loctation check
    vistor_check = get_location(client_ip)

    return vistor_check




def state_protest(request):
    return render(request, 'state_protest.html', {})