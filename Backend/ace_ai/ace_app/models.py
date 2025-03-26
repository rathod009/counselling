from django.db import models


class User_Register(models.Model):
    Name = models.CharField(max_length=50)
    Email = models.EmailField()
    Mobile = models.CharField(max_length=15)
    Password = models.CharField(max_length=55)
    City = models.CharField(max_length=45)
    Demo = models.CharField(max_length=55)