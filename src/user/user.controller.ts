import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "../auth/decorator/getUser.decorator";
import { JwtGuard } from "../auth/guard";
import { UserDefault } from "../prisma/util/prisma.user.select";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get("me")
  getOne(@GetUser() user: UserDefault) {
    return user;
  }
}
