from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from pinha.models import Store, image_path
import uuid
from django.utils import timezone

# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, phoneNumber, nickname, password):
        if not phoneNumber:
            raise ValueError("Phone Number is Required")
        user = self.model(
            phoneNumber=phoneNumber,
            nickname=nickname
        )
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phoneNumber, nickname, password):
        user = self.model(
            nickname=nickname,
            phoneNumber=phoneNumber,
            date_joined=timezone.now()
        )
        user.set_password(password)
        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    nickname = models.CharField(max_length=20, null=False, blank=False, unique=True)
    phoneNumber = models.CharField(max_length=11, null=False, blank=False, unique=True)
    avatar = models.ImageField(upload_to=image_path, null=True, blank=True)
    background = models.ImageField(upload_to=image_path, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    is_school_verified = models.BooleanField(default=False, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    uuid = models.UUIDField(default=uuid.uuid4, null=False, blank=False)

    USERNAME_FIELD = 'phoneNumber'
    REQUIRED_FIELDS = ['nickname']


class Badge(models.Model):
    is_first_avatar_change = models.BooleanField(default=False, blank=False, null=False)
    is_first_review = models.BooleanField(default=False, blank=False, null=False)
    shared_count = models.PositiveSmallIntegerField(default=0, blank=False, null=False)
    is_first_save_store = models.BooleanField(default=False, blank=False, null=False)
    review_count = models.PositiveSmallIntegerField(default=0, blank=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE)


class FavList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='favlist', null=False)
    store = models.ManyToManyField(Store)
    caption = models.CharField(max_length=100, null=True, blank=True)
    is_public = models.BooleanField(default=True, blank=False, null=False)


class RefreshToken(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, null=False, blank=False)
    last_refreshed = models.DateTimeField(default=timezone.now, null=False, blank=False)
    user = models.ForeignKey(User, related_name='refresh_tokens', null=False, blank=False)
    device = models.CharField(max_length=100, null=True, blank=True)
    ip = models.GenericIPAddressField(unpack_ipv4=True, protocol='both')
