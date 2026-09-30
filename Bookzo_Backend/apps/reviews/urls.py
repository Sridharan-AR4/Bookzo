from django.urls import path

from .views import ReactionView, ReviewListCreateView, ReviewUpdateDeleteView

urlpatterns = [
    path("movies/<int:movie_id>/reviews", ReviewListCreateView.as_view()),
    path("reviews/<int:pk>", ReviewUpdateDeleteView.as_view()),
    path("reviews/<int:pk>/reaction", ReactionView.as_view()),
]
