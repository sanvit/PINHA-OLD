import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


def image_path(instance, filename):
    ext = filename.split(".")[-1]
    id = str(uuid.uuid4())
    filename = f"{id[:2]}/{id[2:]}.{ext}"
    return f"images/{filename}"


class PhoneAuth(models.Model):
    number = models.CharField(max_length=11, null=False, blank=False, unique=True)
    code = models.CharField(max_length=6, null=False, blank=False, unique=False)
    sentTime = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.sentTime = timezone.now()

    def __str__(self):
        return self.number


class Category(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    text = models.TextField()

    def __str__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    phone = models.CharField(max_length=15, null=True, blank=True)
    time = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    address = models.CharField(max_length=100, null=False, blank=False)
    kakao_id = models.CharField(max_length=50, null=True, blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    stars = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name="reviews")
    title = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    contents = models.TextField()
    stars = models.PositiveSmallIntegerField(null=False, blank=False)
    is_public = models.BooleanField(default=True, null=False, blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)
    liked = models.PositiveSmallIntegerField(null=False, blank=False, default=0)
    disliked = models.PositiveSmallIntegerField(null=False, blank=False, default=0)

    def save(self, *args, **kwargs):
        reviews = self.store.reviews.all()
        stars = 0
        for review in reviews:
            stars += review.stars
        stars = stars / len(reviews)
        self.store.stars = stars
        self.store.save()

    def __str__(self):
        return f"{self.store.name} {self.title}"


class Menu(models.Model):
    image = models.ImageField(upload_to=image_path, null=False, blank=False)
    page = models.PositiveSmallIntegerField(default=1, null=False, blank=False)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.store.name} {self.page}"


class Photo(models.Model):
    caption = models.CharField(max_length=100, null=True, blank=True)
    file = models.ImageField(upload_to=image_path, null=False, blank=False)
    review = models.ForeignKey(Review, null=True, blank=True, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, null=False, blank=False, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.store.name} {self.store.primary_key}"
