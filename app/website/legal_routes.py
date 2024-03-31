from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from . import random_stuff, app_functions
from .views import check_maintenance2, basic_context
from .models import Issues
from django.db.models import Count
from django.contrib import messages

general_faw = [
    [1, 
     f'Is {random_stuff.name_} safe?', 
     f"""
        Yes, {random_stuff.name_}.com is a safe platform designed for adults over the legal age of (18) or (21), 
        depending on your local laws. Our commitment to safety extends to every aspect of our website, including 
        data handling and content moderation. You can also visit our Privacy Policy page for detailed information 
        on how we handle your data securely. Additionally, we rigorously ensure that all content on our platform 
        complies with applicable laws and regulations, and we maintain a strict policy against unlawful or abusive 
        content. {random_stuff.name_}.com is hosted in the USA, and we do not engage in offshore development. 
        This approach minimizes the risk of viruses, malware, and spyware. Your safety and security are our top 
        priorities.
     """
     ],
    
    
    
    [2, 
     "How do I contact you?", 
     'You can contact us by clicking on the little person icon on the top right corner of your screen, there you will see an option to contact. If you are on mobile, go to the hamburger pie icon and at the bottom there will be a option to contact us.'
     ],
    
    
    [3,
     "I have a great idea for your site, how can I tell you?",
     "You can tell us any idea you have or vote on others ideas on the help improve link in the footer of the page."
     ],
    
    [
        4,
        'Can I embed videos from other sites here?',
        "yes you can embed videos from other websites here, when you submit content be sure to choose the option to embed."
    ]
    
]






# =====================================================================================================
#, LEGAL ROUTES



#* route function for NOTICE page
@check_maintenance2
def notice(request):
    context = {
        'updated':'February 10th, 2024'
    }
    context.update(basic_context)
    return render(request, 'pages/legal/notice.html', context)





#* route function for Privacy Policy page
@check_maintenance2
def privacy_policy(request):
    context = {
        'updated':'February 21st, 2024'
    }
    context.update(basic_context)
    return render(request, 'pages/legal/privacy_policy.html', context)






#* route function for the terms of use page
@check_maintenance2
def termsOfUse(request):
    context = {
        'updated':'February 22st, 2024'
    }
    context.update(basic_context)
    return render(request, 'pages/legal/termsOfUse.html', context)






#* route function for the DMCA copyright bullshit
@check_maintenance2
def DMCA(request):
    context = {
        'updated':'February 21st, 2024'
    }
    context.update(basic_context)
    return render(request, 'pages/legal/dmca.html', context)






#* route function to save my ass 18 U.S.C. §2257
@check_maintenance2
def law_2257(request):
    return render(request, 'pages/legal/2257.html', basic_context)







#* route function for DMCA takedown form
@check_maintenance2
def DMCA_takedown(request):
    return render(request, 'pages/legal/dmca_takedown_form.html', basic_context)





#* route function for FAQ
@check_maintenance2
def faq(request):
    context = {
        "questions": general_faw,
        "last_update": "March, 10th 2024",
    }
    context.update(basic_context)
    return render(request, 'pages/legal/faq.html', context)




#* route function for help improve
@check_maintenance2
def help_improve(request):

    issues = Issues.objects.annotate(likes_count=Count('issue_likes')).order_by('-likes_count')


    # Define how many videos you want per page
    videos_per_page = 12
    # Create a Paginator object
    paginator = Paginator(issues, videos_per_page)
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
        'issues': videos_page,
        
    }
    context.update(basic_context)
    return render(request, 'pages/legal/help_improve.html', context)







#* route function for Parental Controls
@check_maintenance2
def parental_controls(request):
    context = {
        "updated": "March 15th, 2024",
    }
    context.update(basic_context)
    return render(request, 'pages/legal/parental_controls.html', context)









#* route function for Contact Us
@check_maintenance2
def contact_us(request):
    context = {
        'updated': "March 27th, 2024"
    }
    context.update(basic_context)
    return render(request, 'pages/legal/contact.html', context)






#* route function that executes when user submits contact form
def contact_form_submitted(request):
    if request.method == "POST":
        email = request.POST.get('contact-emailInput')
        
        print()
        print('-'*45)
        print(email)
        print('-'*45)
        print()
        
        
        messages.success(request, 'Your request has been processed, We will get back to you soon.')
        return redirect('index1')
    
    messages.success(request, 'An error has happened. Please try again.')
    return redirect('contact_us')
    


#* route function for processing DMCA takedown form
def dmca_takedown_submission(request):
    if request.method == 'POST':
        first_url = request.POST.get('first_url')
        selection = request.POST.get('dd-work')
        
        first_name = request.POST.get('first-name-dmca')
        last_name = request.POST.get('last-name-dmca')
        address = request.POST.get('address-dmca')
        copyrightholder = request.POST.get('copyrightholder-dmca')
        city = request.POST.get('city-dmca')
        state = request.POST.get('State-dmca')
        country = request.POST.get('Country-dmca')
        zip = request.POST.get('Zip-dmca')
        phone = request.POST.get('Phone-dmca')
        email = request.POST.get('Email-dmca')
        
        
        legal1 = request.POST.get('legal1')
        legal2 = request.POST.get('legal2')
        legal3 = request.POST.get('legal3')
        legal4 = request.POST.get('legal4')
        legal5 = request.POST.get('legal5')
        
        
        final_inpt = request.POST.get('final-input')    
        
        message = f"""
        DMCA Takedown Notice\n\nVideo URL: {first_url}\n
        First Name: {first_name}\n
        Last Name: {last_name}\n
        Address: {address}\n
        City: {city}\n
        State: {state}\n
        Country: {country}\n
        Zip: {zip}\n
        Phone: {phone}\n
        Email: {email}\n
        
        """
        
        app_functions.send_email(message, "NEW DMCA Takedown Form!")
        
        
        messages.success(request, 'Your request is now processing, please give us 24 hours to respond')
        return redirect('DMCA_takedown')
    
    
    messages.success(request, 'Sorry, there was a problem with your request, try again')
    return redirect('DMCA_takedown')