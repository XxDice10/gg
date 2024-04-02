from django.db import models
from . import app_functions
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=255, default='Post Title')
    caption = models.TextField() 
    comments = models.TextField(default='0', null=True) 
    likes = models.TextField(default='0') 
    mediaPath = models.TextField() 
    tags = models.TextField()
    mediaType = models.TextField(default='NoneType')
    submitted_by = models.TextField(default='none')
    views = models.TextField(default="0", null=True)
    thumbnail = models.TextField(default='none', null=True)
    duration = models.TextField(default='0', null=True)
    play_id = models.TextField(default=app_functions.generate_random_id) # each time a new post is made i want a new id
    timestamp = models.DateTimeField(auto_now_add=True)  # Add this line
    # | add the line above when you finish adding full dataset
    
    
    main_likes = models.ManyToManyField(User, related_name="post_like", blank=True)
    dislikes = models.ManyToManyField(User, related_name="post_dislikes", blank=True)
    embedded = models.TextField(default='False', null=True)
    categories = models.TextField(default='none', null=True)
    pornstars = models.TextField(default='none', null=True)
    true_category = models.TextField(default='none', null=True)
    
    
    def __str__(self):
        return self.title
    
    def number_of_likes(self):
        return self.main_likes.count()
    
    
    def number_of_dislikes(self):
        return self.dislikes.count()
    
    
    
    def like_post(self, user):
        if user in self.dislikes.all():
            self.dislikes.remove(user)
        self.likes.add(user)

    def dislike_post(self, user):
        if user in self.likes.all():
            self.likes.remove(user)
        self.dislikes.add(user)
    
    
    def total_views(self):
        self.views = str(self.views) 
        if len(self.views) == 4:
            first = self.views[0]
            second = self.views[1]
            return f'{first}.{second}k'
        elif len(self.views) == 5:
            first = self.views[0]
            second = self.views[1]
            third = self.views[2]
            return f'{first}{second}.{third}k'
        elif len(self.views) == 6:
            first = self.views[0]
            second = self.views[1]
            third = self.views[2]
            fourth = self.views[3]
            return f'{first}{second}{third}.{fourth}k'
        elif len(self.views) == 7:
            first = self.views[0]
            second = self.views[1]
            return f'{first}.{second}m'
        elif len(self.views) == 8:
            first = self.views[0]
            second = self.views[1]
            third = self.views[2]
            return f'{first}{second}.{third}m' 
        else:
            return self.views
    
    
    
# relationship status
# hair color tattoos
# height
# ethnicity
# interested in
    

class Members(models.Model):
    username = models.CharField(max_length=255)
    user_ip = models.TextField(default='none', null=True)
    user_email = models.TextField(default='none', null=True)
    user_gender = models.TextField(default='none', null=True)
    user_birthday = models.TextField(default='none', null=True)
    is_premium = models.TextField(default='false', null=True)
    user_first_name = models.TextField(default='none', null=True)
    user_last_name = models.TextField(default='none', null=True)
    user_location = models.TextField(default='none', null=True)
    user_liked_posts = models.TextField(default='none', null=True)
    profile_description = models.CharField(max_length=255, default="none", null=True)
    profile_views = models.TextField(default='0', null=True)
    video_views = models.TextField(default='0', null=True)
    likes = models.TextField(default='0', null=True)
    dislikes = models.TextField(default='0', null=True)
    verified = models.BooleanField(default=False)

    
    
    def __str__(self):
        return self.username
    
    
    
    
    
class Issues(models.Model):
    title = models.TextField(default='none', null=True)
    issue_likes = models.ManyToManyField(User, related_name="issues_like", blank=True)
    issue_dislikes = models.ManyToManyField(User, related_name="issues_dislikes", blank=True)
    main_problem = models.TextField(default='none', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.title
    
    
    def number_of_likes(self):
        return self.issue_likes.count()
    
    
    def number_of_dislikes(self):
        return self.issue_dislikes.count()
    
    
    
    def like_post(self, user):
        if user in self.issue_dislikes.all():
            self.issue_dislikes.remove(user)
        self.issue_likes.add(user)

    def dislike_post(self, user):
        if user in self.issue_likes.all():
            self.issue_likes.remove(user)
        self.issue_dislikes.add(user)