from django.db import models
from django.contrib.auth.models import User


class ImageStorage(models.Model):
    upload_file = models.FileField()
    date = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)

