from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Reaction, Review


class ReviewSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    profile_picture = serializers.ImageField(
        source="user.profile_picture", read_only=True
    )
    movie = serializers.CharField(source="movie.name", read_only=True)
    movie_id = serializers.IntegerField(source="movie.id", read_only=True)

    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    user_reaction = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "title",
            "description",
            "user_id",
            "first_name",
            "last_name",
            "profile_picture",
            "movie",
            "movie_id",
            "upvotes",
            "downvotes",
            "user_reaction",
            "created_at",
            "updated_at",
        ]

    def get_upvotes(self, obj):
        return obj.reactions.filter(type=Reaction.ReactionType.UPVOTE).count()

    def get_downvotes(self, obj):
        return obj.reactions.filter(type=Reaction.ReactionType.DOWNVOTE).count()

    def get_user_reaction(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None

        reaction = obj.reactions.filter(user=request.user).first()
        return reaction.type if reaction else None


class ReviewCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["title", "description"]

    def is_valid(self, *, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)

        payload_keys = set(self.initial_data.keys())
        serializer_fields = set(self.fields.keys())
        extra_fields = payload_keys - serializer_fields

        if extra_fields:
            if raise_exception:
                raise ValidationError(
                    {
                        "non_field_errors": [
                            f"Unexpected fields: {','.join(extra_fields)}"
                        ]
                    }
                )
            valid = False

        return valid

    def create(self, validated_data):
        return Review.objects.create(**validated_data)


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ["type", "review"]

    def validate(self, data):
        request = self.context["request"]
        if data["review"].user == request.user:
            raise serializers.ValidationError("You cannot react to your own review")
        return data

    def create(self, validated_data):
        user = self.context["request"].user
        review = validated_data["review"]
        reaction_type = validated_data["type"]

        reaction, created = Reaction.objects.get_or_create(
            user=user,
            review=review,
            defaults={"type": reaction_type},
        )

        if not created:
            if reaction.type == reaction_type:
                reaction.delete()
            else:
                reaction.type = reaction_type
                reaction.save()

        return reaction
