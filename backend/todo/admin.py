from django.contrib import admin
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'startDate', 'endDate', 'completed', 'priority')


admin.site.register(Todo, TodoAdmin)
