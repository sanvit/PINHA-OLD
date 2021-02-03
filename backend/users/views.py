from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import User
from pinha.models import PhoneAuth
from random import randint
from django.utils import timezone
from datetime import timedelta


def getOTPCode(req):
    phone = req.GET["phone"]
    if PhoneAuth.objects.filter(number=phone):
        a = PhoneAuth.objects.get(number=phone)

        """
        data = {
            'phone': phone,
            'code': authData.code,
            'time': authData.sent_time
        }
        return JsonResponse(data)
        """

        if a.sent_time + timedelta(seconds=59) > timezone.now():
            return JsonResponse(
                {
                    "status": "FAILED",
                    "phone": phone,
                    "code": a.code,
                    "time": a.sent_time,
                    "message": "잠시 후 다시 시도해주세요",
                }
            )
    else:
        print("NONE")
        a = PhoneAuth()
    code = str(randint(0, 999999)).zfill(6)
    a.number = phone
    a.code = code
    a.save()
    data = {
        "status": "SUCCESS",
        "phone": phone,
        "code": a.code,
        "time": a.sent_time,
        "timedelta": a.sent_time + timedelta(seconds=59),
        "current": timezone.now(),
    }
    return JsonResponse(data)


def login_with_phone(request):
    phone = request.GET["phone"]
    code = request.GET["code"]
    user = User()
    if PhoneAuth.objects.filter(number=phone):
        auth = PhoneAuth.objects.get(number=phone)
        if auth.sent_time > timezone.now() - timedelta(seconds=60):
            print(timezone.now() + timedelta(seconds=5))
            if auth.code == code:
                return HttpResponse("Login Success")
            return HttpResponse("AuthKey did not match")
        return HttpResponse("Code Expired")
    return HttpResponse("No Code Found")
