import {
  AppException,
  NotFoundException,
} from "../../shared/exceptions/app.exceptions";
import { UserRepository } from "../users/user.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskRepository } from "./task.repository";

export class TaskService {
  public taskRepository: TaskRepository;
  public userRepository: UserRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.userRepository = new UserRepository();
  }

  public async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  public async create(taskData: CreateTaskDto): Promise<Task> {
    const user = this.userRepository.findById(taskData.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    try {
      return await this.taskRepository.create(taskData);
    } catch (error) {
      throw new Error((error as any)?.message || "Error creating task");
    }
  }

  public async update(id: number, taskData: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    try {
      await this.taskRepository.update(id, taskData);
      return { ...task, ...taskData };
    } catch (error) {
      throw new Error((error as any)?.message || "Error updating task");
    }
  }

  public async delete(id: number): Promise<boolean> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    try {
      return await this.taskRepository.delete(id);
    } catch (error) {
      throw new Error((error as any)?.message || "Error deleting task");
    }
  }
}
