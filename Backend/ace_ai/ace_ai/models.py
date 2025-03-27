from django.db import models


class Register_Data(models.Model):
    Name = models.CharField(max_length=50)
    Email = models.EmailField()
    Mobile = models.CharField(max_length=50)
    Password = models.CharField(max_length=300)
    City = models.CharField(max_length=50)
    Type = models.CharField(max_length=20, default='student')
    Gender = models.CharField(max_length=50)
    objects = None