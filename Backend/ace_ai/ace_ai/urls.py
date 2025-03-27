from django.urls import path
from .views import *

urlpatterns = [
    path('', Home),
    path('Register', Register),
    path('Login', Login, name='Login'),
    path('Parents', Parents),
    path('send-otp', Send_Otp),
    path('verify-otp', Verify_Otp),
    path('Logout', Logout1)
]