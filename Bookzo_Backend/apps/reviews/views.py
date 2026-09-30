from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.movies.models import Movie

from .models import Review
from .serializers import (
    ReactionSerializer,
    ReviewCreateUpdateSerializer,
    ReviewSerializer,
)


class ReviewListCreateView(ListCreateAPIView):
    """
    API endpoint for listing all reviews for a movie and creating a review for a movie
    """

    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        user_review = None
        if request.user.is_authenticated:
            review = queryset.filter(user=request.user).first()
            if review:
                user_review = self.get_serializer(review).data

        return Response(
            {
                "count": self.paginator.page.paginator.count,
                "next": self.paginator.get_next_link(),
                "previous": self.paginator.get_previous_link(),
                "results": serializer.data,
                "user_review": user_review,
            }
        )

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ReviewCreateUpdateSerializer
        return ReviewSerializer

    def get_queryset(self):
        movie_id = self.kwargs.get("movie_id")
        return (
            Review.objects.filter(movie_id=movie_id)
            .select_related("user", "movie")
            .prefetch_related("reactions")
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        movie = get_object_or_404(Movie, id=self.kwargs["movie_id"])
        if Review.objects.filter(user=self.request.user, movie=movie).exists():
            raise ValidationError({"detail": "You have already reviewed this movie."})

        serializer.save(user=self.request.user, movie=movie)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ReviewUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating and deleting a review
    """

    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return ReviewCreateUpdateSerializer
        return ReviewSerializer

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You can only update your own review")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You can only delete your own review")
        instance.delete()


class ReactionView(APIView):
    """
    API endpoint to add, update or remove a reaction (upvote/downvote) on a review
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        review = get_object_or_404(Review, id=pk)

        serializer = ReactionSerializer(
            data={
                "type": request.data.get("type"),
                "review": review.id,
            },
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        response_serializer = ReviewSerializer(review, context={"request": request})
        return Response(response_serializer.data, status=status.HTTP_200_OK)
