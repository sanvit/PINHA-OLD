from django.contrib import admin
from django.utils.safestring import mark_safe
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Badge, UserManager, FavList


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    """
    User Admin
    """

    def avatar_image(self, user):
        """ admin func """
        return mark_safe(f"<img src={user.avatar_url} alt='image' width='100px' />")

    fieldsets = (
        (None, {"fields": ("phoneNumber", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "nickname",
                    "email",
                    "is_school_verified",
                    "background",
                    "avatar",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {"classes": ("wide",), "fields": ("phoneNumber", "password", "password2"),},
        ),
    )
    list_display = (
        "nickname",
        "avatar_image",
        "phoneNumber",
        "email",
        "is_staff",
    )
    list_display_links = (
        "avatar_image",
        "nickname",
    )
    search_fields = ("nickname", "phoneNumber", "email")
    ordering = ("phoneNumber",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    pass
