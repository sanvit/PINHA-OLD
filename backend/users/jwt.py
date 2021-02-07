import uuid
import jwt
from .models import User, RefreshToken
from django.utils import timezone
from django.conf import settings


def generateAccessToken(user, request):
    pass


def generateRefreshToken(user, request, uuid):
    user_agent = request.META.get('HTTP_USER_AGENT')
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if uuid:
        refresh = RefreshToken.objects.get(pk=uuid)
    else:
        refresh = RefreshToken()
        refresh.uuid = uuid.uuid4()
    refresh.device = user_agent
    refresh.ip = ip
    refresh.last_refreshed = timezone.now()
    return jwt.encode(
        {"uuid": refresh.token_uuid, 'iat': refresh.last_refreshed},
        settings.SECRET_KEY, algorithm="HS256",)
