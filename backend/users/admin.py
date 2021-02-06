from django.contrib import admin
from .models import User, Badge, UserManager
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('phoneNumber', 'password')}),
        (('Personal info'), {'fields': ('email', 'is_school_verified')}),
        (('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phoneNumber', 'password', 'password2'),
        }),
    )
    list_display = ('phoneNumber', 'email', 'is_staff')
    search_fields = ('phoneNumber', 'email')
    ordering = ('phoneNumber',)
    filter_horizontal = ('groups', 'user_permissions',)


admin.site.register(User, UserAdmin)
