from datetime import datetime

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from .forms import SignUpForm, FileUploadForm
from .models import ImageStorage
from .email_send import email_sender
from django.conf import settings


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


@login_required
@csrf_exempt
def file_upload(request):
    if request.method == 'POST' and request.FILES['upload_file']:
        if int(request.META['CONTENT_LENGTH']) > int(settings.MAX_UPLOAD_SIZE):
            return JsonResponse({
                'error': 'file more then ' + settings.MAX_UPLOAD_SIZE,
                'size': request.META['CONTENT_LENGTH']
            })

        user = request.user
        upload_file = request.FILES['upload_file']

        form = FileUploadForm(
            {
                'upload_file': upload_file,
                'uploaded_by': user
            },
            request.FILES
        )
        if form.is_valid():
            a = form.save()

            # логин пользователя
            # дата - время записи
            # путь к загруженному файлу

            message = f'{user.username};{a.date};media/{str(a.upload_file)}'
            recipient = user.username
            email_sender(message=message, recipient=recipient)

            return JsonResponse({
                'message': 'file is uploaded',
                'upload_file': 'media/' + str(a.upload_file),
                'uploaded_by': request.user.username,
                'date': str(a.date)

            })
        else:
            return JsonResponse({'error': 'file save error'})

    return JsonResponse({'error': 'only POST request'})


@login_required
@csrf_exempt
def image_reload(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'only POST request'})

    if not request.FILES['upload_file']:
        return JsonResponse({'error': 'file POST required'})

    if request.POST.get('image_id', None) is None:
        return JsonResponse({'error': 'image_id field is required'})

    if int(request.META['CONTENT_LENGTH']) > int(settings.MAX_UPLOAD_SIZE):
        return JsonResponse({
            'error': 'file more then ' + settings.MAX_UPLOAD_SIZE,
            'size': request.META['CONTENT_LENGTH']
        })

    image_id = request.POST.get('image_id', None)
    try:
        image = ImageStorage.objects.get(id=image_id)
    except ImageStorage.DoesNotExist as e:
        return JsonResponse({'error': 'server error'})

    user = request.user
    upload_file = request.FILES['upload_file']

    form = FileUploadForm(
        {
            'upload_file': upload_file,
            'uploaded_by': user
        },
        request.FILES
    )
    if not form.is_valid():
        return JsonResponse({'error': 'file save error'})
    image.data = datetime.now()
    image.uploaded_by = user
    image.upload_file = upload_file
    try:
        image.save()
    except Exception as e:
        return JsonResponse({'error': 'file save error', 'message': str(e)})

    return JsonResponse({'message': 'image reloaded'})


@login_required
@csrf_exempt
def get_file_list(request):
    user = request.user
    query = ImageStorage.objects.filter(uploaded_by=user).select_related('uploaded_by')
    result = []
    for row in query:
        result.append({
            'uploaded_by': row.uploaded_by.username,
            'upload_file': 'media/' + str(row.upload_file),
            'date': row.date,
            'image_id': row.id
        })
    return JsonResponse({'result': result}, safe=False)


@login_required
@csrf_exempt
def image_history(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'only GET request'})

    if request.GET.get('image_id', None) is None:
        return JsonResponse({'error': 'image_id field is required'})

    image_id = request.GET.get('image_id', None)
    user = request.user

    query = ImageStorage.history.filter(
        uploaded_by=user,
        id=image_id
    ).select_related('uploaded_by').order_by('date')

    result = []
    for row in query:
        result.append({
            'uploaded_by': row.uploaded_by.username,
            'upload_file': 'media/' + str(row.upload_file),
            'date': row.date,
            'image_id': row.id
        })
    return JsonResponse({'result': result}, safe=False)
