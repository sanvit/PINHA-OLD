from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # 임시
        fields = (
            "id",
            "nickname",
            "phoneNumber",
            "avatar",
            "background",
            "email",
            "is_school_verified",
            "is_active",
            "is_admin",
            "is_superuser",
            "is_staff",
            "date_joined",
        )
        # 임시
        read_only_fields = ("id",)

    # 임시
    def create(self, validated_data):
        password = validated_data["password"]
        user = super().create(validated_data)
        user.set_password(password)  # password 암호화
        user.save()
        return user
