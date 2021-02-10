from django.contrib import admin
from .models import Store


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "opening_time",
        "address",
        "stars",
    )


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    pass
