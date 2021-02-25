
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('main.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT, show_indexes=True) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT, show_indexes=True) \
  + static(settings.FRONTEND_URL, document_root=settings.FRONTEND_ROOT, show_indexes=True) \

