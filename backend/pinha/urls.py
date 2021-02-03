from django.urls import path
from . import views

app_name = "pinha"

urlpatterns = [
    path("store/kakao/", views.KakaoStoreView.as_view()),
]