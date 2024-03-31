from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from website import views


urlpatterns = [
    path('mmi/', admin.site.urls),
    path('', include('website.urls')),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('users.urls')),
]


handler404 = views.error_404


# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns += [
#         path('__debug__/', include(debug_toolbar.urls)),
#     ]
