from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def apiOverView(request):
    api_urls = {
        'List': '/task-list/',
        'Create': '/task-create',
        'Update': '/task-update/<str:pk>',
        'Detail': '/task-detail/<int:pk>',
        'Delete': '/task-delete/<str:pk>',

    }
    return Response(api_urls)


@api_view(['GET'])
def TaskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def TaskDetail(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def TaskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def TaskUpdate(request, pk):
    task = Task.objects.get(id=pk)

    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def TaskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response("Item deleted")
