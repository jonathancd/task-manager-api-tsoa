import { Delete, Get, Path, Route, Tags } from "tsoa";
import { BaseController } from "../../shared/controllers/base.controller";
import { UserService } from "./user.service";
import { IApiResponse } from "../../shared/types/app.types";
import { User } from "./entities/user.entity";

@Route("users")
@Tags("Users")
export class UserController extends BaseController {
  constructor(public userService: UserService = new UserService()) {
    super();
  }

  @Get("/")
  async index(): Promise<IApiResponse<User[]>> {
    const result = await this.userService.findAll();
    return this.success(result);
  }

  @Delete("/{id}")
  async delete(@Path() id: number): Promise<void> {
    await this.userService.delete(id);
    this.setStatus(204);
  }
}
