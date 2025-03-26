from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import User_Register


def Register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User_Register.objects.create(
                Name = data['name'],
                Email = data['email'],
                Mobile = data['mobile'],
                Password = data['password'],
                city = data['city'],
                Demo = data['demo']
            )
            return JsonResponse({'message': 'User Registered SuccessFully !!'}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=400)