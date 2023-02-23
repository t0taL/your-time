import {StorageService} from "./storage.service";
import {Task} from "../interfaces";

export class TasksService {
  private static readonly storageService = new StorageService(localStorage);

  private static readonly tasksKey: string = 'tasks';

  public static getTasks(): Task[] {
    return this.storageService.getByKey<Task[]>(this.tasksKey) ?? [];
  }

  public static getTaskById(taskId: string): Task | null {
    return this.getTasks().find((task: Task) => task.id === taskId) ?? null;
  }

  public static createTask(creatingTask: Task): void {
    const updatedTasks: Task[] = [
      creatingTask,
      ...this.getTasks()
    ]

    this.updateTasks(updatedTasks);
  }

  public static updateTask(updatingTask: Task): void {
    const updatedTasks: Task[] = this.getTasks().map((task: Task) => {
      if (task.id === updatingTask.id) {
        return updatingTask;
      }

      return task;
    });

    this.updateTasks(updatedTasks);
  }

  public static deleteTaskById(taskId: string): void {
    const filteredTasks: Task[] = this.getTasks().filter((task: Task) => task.id !== taskId);

    this.updateTasks(filteredTasks);
  }

  private static updateTasks(tasks: Task[]): void {
    this.storageService.setByKey<Task[]>(this.tasksKey, tasks);
  }
}