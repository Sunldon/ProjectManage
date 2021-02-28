from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=120)
    # description = models.TextField()
    startDate = models.CharField(max_length=30, default='1970-1-1')
    endDate = models.CharField(max_length=30, default='1970-1-1')
    projectManager = models.CharField(max_length=50, default='')
    completed = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)

    def _str_(self):
        return self.title
