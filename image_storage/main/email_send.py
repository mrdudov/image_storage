from django.core.mail import send_mail
from django.conf import settings


def email_sender(message, recipient):
    subject = 'image storage'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [recipient]
    send_mail(subject, message, email_from, recipient_list)
    return {'message': 'email is send'}
