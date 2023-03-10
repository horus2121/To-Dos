import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  token = this.authService.token;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTaskList() {
    const user = JSON.parse(localStorage.getItem('user')!);

    return this.http.get(`/api/${user.uid}/tasks`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  addNewTask(task: Task) {
    const user = JSON.parse(localStorage.getItem('user')!);

    const newTask = {
      content: task.content,
      status: task.status,
      userId: user.id
    };

    return this.http.post(`/api/${user.uid}/tasks`, newTask, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  editTask(task: Task) {
    const user = JSON.parse(localStorage.getItem('user')!);

    return this.http.patch(`/api/${user.uid}/tasks/${task.id}`, task, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  deleteTask(taskId: number) {
    const user = JSON.parse(localStorage.getItem('user')!);

    return this.http.delete(`/api/${user.uid}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
