from django.urls import path
from .consumer import ChatConsumer

websocket_urlpatterns = [
    path('ws/notification/<str:room_name>/', ChatConsumer.as_asgi()),
]