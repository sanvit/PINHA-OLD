import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone
from core.models import TimeStampedModel


def image_path(instance, filename):
    ext = filename.split(".")[-1]
    id = str(uuid.uuid4())
    filename = f"{id[:2]}/{id[2:]}.{ext}"
    return f"pinha/{filename}"


class Store(TimeStampedModel):

    """ [Store Model] 가게 (가메이, ...) """

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    phone = models.CharField(max_length=20, null=True, blank=True)
    opening_time = models.TextField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=100, null=False, blank=False)
    kakao_id = models.CharField(max_length=50, null=True, blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    stars = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    category = models.ForeignKey(
        "Category", on_delete=models.SET_NULL, null=True, blank=True,
    )

    def __str__(self):
        return self.name


class StoreMenu(models.Model):

    """ [StoreMenu Model] 메뉴판 """

    image = models.ImageField(upload_to=image_path, null=False, blank=False)
    page = models.PositiveSmallIntegerField(default=1, null=False, blank=False)
    store = models.ForeignKey("Store", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.store.name} {self.page}"


class Category(models.Model):

    """ [Category Model] 일식, 분식, 한식, ...  """

    name = models.CharField(max_length=30, null=False, blank=False)
    text = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Review(TimeStampedModel):

    """ [Review Model] 가게에 대한 후기, 댓글 """

    title = models.CharField(max_length=100, null=True, blank=True)
    contents = models.TextField()
    stars = models.PositiveSmallIntegerField(null=False, blank=False)
    is_public = models.BooleanField(
        default=True, null=False, blank=False
    )  # FIXME 이게 뭐였지?
    liked = models.PositiveSmallIntegerField(null=False, blank=False, default=0)
    disliked = models.PositiveSmallIntegerField(null=False, blank=False, default=0)
    store = models.ForeignKey("Store", on_delete=models.CASCADE, related_name="reviews")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews",
    )

    def save(self, *args, **kwargs):
        reviews = self.store.reviews.all()
        stars = 0
        for review in reviews:
            stars += review.stars
        stars = stars / len(reviews)
        self.store.stars = stars
        self.store.save()

    def __str__(self):
        return f"{self.store.name} {self.title} by {self.author}"


class Photo(TimeStampedModel):

    """ [Photo Model] 가게 사진들, 리뷰에서 올리면 가게에서 미리보기로 뜬다. """

    caption = models.CharField(max_length=100, null=True, blank=True)
    photo = models.ImageField(upload_to=image_path, null=False, blank=False)
    review = models.ForeignKey(
        "Review",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="photos",
    )

    def __str__(self):
        return f"{self.review.title}"


# ???
class PhoneAuth(models.Model):
    number = models.CharField(max_length=11, null=False, blank=False, unique=True)
    code = models.CharField(max_length=6, null=False, blank=False, unique=False)
    sent_time = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.sent_time = timezone.now()

    def __str__(self):
        return self.number


# class LikedReviews(models.Model):
#     review = models.OneToOneField(
#         Review, on_delete=models.CASCADE, related_name="liked", null=False, unique=True
#     )
#     user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="user")


# class DislikedReviews(models.Model):
#     review = models.OneToOneField(
#         Review,
#         on_delete=models.CASCADE,
#         related_name="disliked",
#         null=False,
#         unique=True,
#     )
#     user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="user")

# ???
class UnderReview(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL
    )
    name = models.CharField(max_length=100, null=False, blank=False)
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
