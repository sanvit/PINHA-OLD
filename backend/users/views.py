import jwt
from random import randint
from datetime import timedelta
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response  # 리턴 모두 이걸로 하면 좋아요!
from pinha.models import PhoneAuth
from .models import User


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


from django.contrib.auth import authenticate


class Login(APIView):
    def post(self, request):
        username = request.data.get("username")  # 여기서 username는 번호
        password = request.data.get("password")
        if not username and password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user:
            encoded_jwt = jwt.encode(
                {"pk": user.pk}, settings.SECRET_KEY, algorithm="HS256",
            )
            return Response(data={"token": encoded_jwt})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
