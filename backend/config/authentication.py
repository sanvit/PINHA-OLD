import jwt
from django.conf import settings
from rest_framework import authentication
from users.models import User


class JWTAuthentication(authentication.BaseAuthentication):

    """
    [Custom JWT Authentication By Yoon Sang Seok]
    AUTHORIZATION : X-JWT mdopNQ3r1039rh109hr193h1r3.asmdmqwpondq.nfewewanf (예)
    """

    def authenticate(self, request):
        # print(request.META)
        token = request.META.get("HTTP_AUTHORIZATION")
        if not token:
            return None
        try:
            xjwt, jwt_token = token.split(" ")
            decoded_jwt = jwt.decode(
                jwt_token, settings.SECRET_KEY, algorithms=["HS256"],
            )
            pk = decoded_jwt.get("pk")
            user = User.objects.get(pk=pk)
            return (user, None)
        except (ValueError, jwt.exceptions.DecodeError, User.DoesNotExist):
            return None
