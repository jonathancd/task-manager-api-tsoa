import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { BaseController } from "../../shared/controllers/base.controller";
import { IApiResponse } from "../../shared/types/app.types";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@Route("tasks")
@Tags("Tasks")
export class TaskController extends BaseController {
  constructor(public taskService: TaskService = new TaskService()) {
    super();
  }

  @Get("/")
  @Response(200, "Tasks retrieved successfully")
  public async index(): Promise<IApiResponse<Task[]>> {
    return this.success([]);
  }
  @Get("/all")
  @Security("jwt")
  @Response(200, "Tasks retrieved successfully")
  public async all(): Promise<IApiResponse<Task[]>> {
    return this.success([]);
  }

  @Post("/")
  @Response(201, "Task created successfully")
  public async create(
    @Body() requestBody: CreateTaskDto
  ): Promise<IApiResponse<Task>> {
    await this.validateDto(CreateTaskDto, requestBody);
    const result = await this.taskService.create(requestBody);
    return this.success(result, "User created successfully");
  }

  @Put("/{id}")
  public async update(
    @Body() requestBody: UpdateTaskDto,
    @Path() id: number
  ): Promise<IApiResponse<Task>> {
    await this.validateDto(UpdateTaskDto, requestBody);
    const result = await this.taskService.update(id, requestBody);
    return this.success(result, "Task updated successfully");
  }

  @Delete("/{id}")
  @Response(204, "Task deleted successfully")
  public async delete(@Path() id: number): Promise<void> {
    await this.taskService.delete(id);
    this.setStatus(204);
  }
}
