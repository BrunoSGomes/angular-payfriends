import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITasks } from '../../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly url = 'http://localhost:3000/tasks'

  constructor(private httpClient: HttpClient) { }

  public async getAllTasks(): Promise<ITasks[]> {
    const allTasks = await this.httpClient.get<ITasks[]>(this.url).toPromise()
    return allTasks
  }

  public async createTask(newTask: Partial<ITasks>): Promise<ITasks> {
    const createdTask = await this.httpClient.post<ITasks>(this.url, newTask).toPromise()
    return createdTask
  }

  public async deleteTask(task: ITasks): Promise<ITasks> {
    const deletedTask = await this.httpClient.delete<ITasks>(`${this.url}/${task.id}`).toPromise()
    return deletedTask
  }

  public async updateTask(task: ITasks): Promise<ITasks> {
    const updatedTask = await this.httpClient.patch<ITasks>(`${this.url}/${task.id}`, task).toPromise()
    return updatedTask
  }

}
