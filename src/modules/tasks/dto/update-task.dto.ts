import { IsIn, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../constants/tasks.constants";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status!: TaskStatus;
}
