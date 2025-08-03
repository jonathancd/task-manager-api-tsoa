import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { AppDataSource } from "../../config/database.config";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

export class TaskRepository {
  public repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Task | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(userData: CreateTaskDto): Promise<Task> {
    const user = await this.repository.create(userData);
    return await this.repository.save(user);
  }

  async update(id: number, userData: UpdateTaskDto): Promise<void> {
    await this.repository.update(id, userData);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
