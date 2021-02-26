from django.contrib.auth import authenticate, login
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.core.validators import EmailValidator
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
# from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import SignUpForm


@csrf_exempt
def index(request):
    context = {'user': request.user}
    template = loader.get_template('main/index.html')
    return HttpResponse(template.render(context, request))


@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        passwd = request.POST.get('passwd')
        username = request.POST.get('email')

        form = SignUpForm({
            'password1': passwd,
            'password2': passwd,
            'username': username,
            'email': username,
        })

        if form.is_valid():
            email_validator = EmailValidator()
            try:
                email_validator(username)
            except ValidationError as e:
                return JsonResponse({'error': str(e)})

            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/')
        else:
            return JsonResponse({'error': form.errors})

    return JsonResponse({'error': 'only POST request'})\



@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        passwd = request.POST.get('passwd')
        username = request.POST.get('email')

        user = authenticate(username=username, password=passwd)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'user sign in'})
        else:
            return JsonResponse({'error': 'login or password is not correct'})

    return JsonResponse({'error': 'only POST request'})


@csrf_exempt
def log_out(request):
    logout(request)
    result = {'message': 'user log out'}
    return JsonResponse(result)


@csrf_exempt
def file_upload(request):
    if request.method == 'POST' and request.FILES['file']:
        upload_file = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(upload_file.name, upload_file)
        uploaded_file_url = fs.url(filename)

        return JsonResponse({
            'message': 'file is uploaded',
            'uploaded_file_url': uploaded_file_url
        })
    return JsonResponse({'error': 'only POST request'})
