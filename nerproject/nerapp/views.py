from django.shortcuts import render
import json

import requests

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics
from nerapp.serializers import UserSerializer, GroupSerializer

import spacy

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class NerViewSet(APIView):
    def post(self, request, format=None):
        nlp = spacy.load("./ner-drugs-model")
        sentence = request.data["sentence"]
        doc = nlp(str(sentence))
        dict_aux = {}
        list_aux = []
        for ent in doc.ents:
            list_aux.append(ent.text)
            dict_aux[str(ent.label_)] = list_aux
        return Response(dict_aux)


