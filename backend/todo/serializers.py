#!/usr/local/bin/python3.6
# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'startDate', 'endDate', 'completed', 'priority', 'projectManager')