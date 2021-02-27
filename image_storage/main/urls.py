from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),

    path('sign-up/', views.sign_up),
    path('sign-in/', views.sign_in),
    path('log-out/', views.log_out),

    path('file-upload/', views.file_upload),

    path('image-reload/', views.image_reload),
    path('image-history/', views.image_history),

    path('get-file-list/', views.get_file_list),
]
