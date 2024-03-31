from django.shortcuts import render
from .models import Post
from . import vistior_session_stuff
from . import views
import time



def check_maintenance2(func):
    def wrapper(request):
        if views.maintenance == True:
            return render(request, 'pages/maintenance.html', {})
        else:
            return func(request)
    return wrapper






def check_state(func):
    def wrapper(request, *args, **kwargs):
        value = vistior_session_stuff.new_vistor(request)
        if value[0] == 'bad':
            context = {"state": value[1]}
            context.update(views.basic_context)
            return render(request, 'state_protest.html', context)
        else:
            return func(request, *args, **kwargs)
    return wrapper




def execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print('~'*45)
        print("Execution time: {:.6f} seconds".format(execution_time))
        print('~'*45)
        return result
    return wrapper