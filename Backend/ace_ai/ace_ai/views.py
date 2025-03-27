from django.shortcuts import render, redirect
from .models import *
from django.core.mail import send_mail
import random
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password


def Home(req):
    return render(req, 'index.html')


def Register(req):
    if req.method == 'POST':
        Name = req.POST['name']
        Email = req.POST['em']
        Phone = req.POST['mobile']
        Password = req.POST['ps']
        Password1 = req.POST['ps1']
        City = req.POST['city']
        Type = req.POST['type']
        Gender = req.POST['gender']

        if Password != Password1:
            Err = 'Password Does Not Match !!'
            return render(req, 'Couselling-Register.html', context={'Err': Err})
        Email_ver = Register_Data.objects.filter(Email=Email).count()
        if Email_ver == 1:
            Err = 'Email Already Exists !!'
            return render(req, 'Couselling-Register.html', context={'Err': Err})
        else:
            Hash1 = make_password(Password)
            S = Register_Data(Name=Name, Email=Email, Mobile=Phone,
                              Password=Hash1, City=City,
                              Type=Type, Gender=Gender)
            S.save()
            Z = User(username=Email, password=Hash1)
            Z.save()
            return redirect(Login)
    else:
        return render(req, 'Couselling-Register.html')


def Login(req):
    next_url = req.GET.get('next')
    if req.method == 'POST':
        Email = req.POST['em']
        Password = req.POST['pw']
        try:
            Record = Register_Data.objects.get(Email=Email)
            if check_password(Password, Record.Password):
                User1 = authenticate(username=Email, password=Password)
                if User1 is not None:
                    login(req, User1)
                    return redirect(Home)
                else:
                    Err = 'User Not Found !!'
                    return render(req, 'Counselling-Login.html', context={'Err': Err})
            else:
                Err = 'Password Does Not Match !!'
                return render(req, 'Counselling-Login.html', context={'Err': Err})
        except:
            Err = 'Email Does Not Match !!'
            return render(req, 'Counselling-Login.html', context={'Err': Err})
    else:
        return render(req, 'Counselling-Login.html')


@login_required(login_url='/Login')
def Parents(req):
    return render(req, 'letter_to_parents.html')


@csrf_exempt
def Send_Otp(req):
    if req.method == 'POST':
        email = req.POST['email']
        Otp = random.randint(100000, 999999)
        req.session['main'] = Otp
        send_mail('Forget Password',
                  f'Your Otp Is {Otp}',
                  settings.EMAIL_HOST_USER,
                  [email, ])
        return JsonResponse({'status': 'success', 'message': 'Otp SuccessFully Sent !!'})
    else:
        return JsonResponse({'status': 'error', 'message': 'invalid Request'})


@csrf_exempt
def Verify_Otp(req):
    if req.method == 'POST':
        if 'OTP' in req.POST and req.POST['OTP'] != '':
            if int(req.POST['OTP']) == int(req.session.get('main')):
                print(int(req.session.get('main')))
                return JsonResponse({'status': 'success', 'message': 'Otp Verified'})
            else:
                return JsonResponse({"status": "error", "message": "Invalid OTP!"})

        return JsonResponse({"status": "error", "message": "Invalid request!"})


def Logout1(req):
    logout(req)
    return redirect(Login)