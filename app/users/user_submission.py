from django.shortcuts import render, redirect
from django.contrib import messages
from website import models
import sqlite3
from website import views
import smtplib
from website import random_stuff
from django.http import JsonResponse
from website import app_functions
from .views import login_required2
import os


@login_required2
def submission(request):
    context = {
        
    }
    context.update(views.basic_context)
    return render(request, 'authenticate/user_dashboard/submission.html', context)



@login_required2
def embed_submission(request):
    context = {}
    context.update(views.basic_context)
    return render(request, 'authenticate/user_dashboard/embed_submission.html', context)





def send_email(message, subject1):
    my_pass ="ovjjnqqoancxhiea"
    my_email = "kirko190255@gmail.com"
    receiver = "supersweet098@gmail.com" # TODO change to os after restart


    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        smtp.login(my_email, my_pass)
        subject = subject1
        body = message

        msg = f"Subject: {subject}\n\n{body}"

        smtp.sendmail(my_email, receiver, msg)




def process_embed_content(request):
    pass



def process_submission_content(request):
    if request.method == 'POST':
        video_title = request.POST.get('new_post_title')
        video_tags = request.POST.get('new_post_tags')

        video = request.FILES.get('videoInput')
        image = request.FILES.get('imageInput')
        
        if video is not None:
            file_size = video.size  # Get the size of the uploaded file
            max_size = 40 * 1024 * 1024  # Define maximum allowed size in bytes (e.g., 10 MB)

            if file_size > max_size:
                messages.success(request, 'Your video exceeds our servers processing limit.')
                return redirect('submission')
            else:
                save_directory = os.path.join('static', 'submissions')
                save_directory = os.path.normpath(save_directory)  # Normalize path

                # Create the directory if it doesn't exist
                if not os.path.exists(save_directory):
                    os.makedirs(save_directory)

                if video.name != '':
                    with open(os.path.join(save_directory, video.name), 'wb+') as destination:
                        for chunk in video.chunks():
                            destination.write(chunk)
                            
                    with open(os.path.join(save_directory, image.name), 'wb+') as destination:
                        for chunk in image.chunks():
                            destination.write(chunk)
                else:
                    messages.success(request, 'video file error')
                    return redirect('submission')

        else:
            messages.success(request, 'video file or thumbnail must not be empty')
            return redirect('submission')
    
    messages.success(request, 'Your content was processed successfully and is now awaiting approval. Thank you for your submission.')
    msg = f"Username: {request.user.username}\nTitle: {video_title}\nTitle Tags: {video_tags}"
    send_email(msg, 'New Content Submission!!')
    return redirect('submission')