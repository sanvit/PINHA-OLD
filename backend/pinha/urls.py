from django.urls import path
from . import views

app_name = "pinha"

urlpatterns = [
    path("/kakao", views.KakaoMarketView.as_view()),
]