import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsNumber()
  userId!: number;
}
