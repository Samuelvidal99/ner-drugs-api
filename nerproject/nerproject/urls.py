from django.db.models import base
from django.urls import include, path
from rest_framework import routers
from nerapp import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('ner/', views.NerViewSet.as_view(), name='ner'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
