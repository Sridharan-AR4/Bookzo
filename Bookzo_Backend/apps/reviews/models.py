from django.conf import settings
from django.db import models

from apps.base.models import TimeStampModel
from apps.movies.models import Movie


class Review(TimeStampModel):
    """
    Review model representing a user review for a movie.
    """

    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=500, blank=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews"
    )
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="reviews")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["movie", "user"], name="unique_review_per_movie_user"
            )
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.movie}"


class Reaction(TimeStampModel):
    """
    Reaction model representing a reaction for the review.
    """

    class ReactionType(models.TextChoices):
        UPVOTE = "UPVOTE", "Upvote"
        DOWNVOTE = "DOWNVOTE", "Downvote"

    type = models.CharField(max_length=10, choices=ReactionType.choices)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reactions"
    )

    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="reactions"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "review"], name="unique_reaction_per_user_review"
            )
        ]
