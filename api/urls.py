from django.urls import path, include
from api import views


urlpatterns = [
    path("", views.apiOverView, name="apiOverView"),
    path("tasklist/", views.TaskList, name="tasklist"),
    path("task-detail/<int:pk>/", views.TaskDetail, name="taskdetail"),
    path("task-create/", views.TaskCreate, name="Taskcreate"),
    path("task-update/<int:pk>", views.TaskUpdate, name="Taskupdate"),
    path("task-delete/<int:pk>", views.TaskDelete, name="Taskdelete")

]
