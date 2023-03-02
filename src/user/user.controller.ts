import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {GetUser} from "src/auth/decorator/getUser.decorator";
import {JwtGuard} from "src/auth/guard";
import {UserDefault} from "src/prisma/util/prisma.user.select";
import {UserService} from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get("me")
  getOne(@GetUser() user: UserDefault) {
    return user;
  }
}
