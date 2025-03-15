import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";

import { UserService } from "./UserService";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import { SearchUserParams } from "./Interfaces/UserInterface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: SearchUserParams) {
    return this.userService.findAll(params);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  findByEmail(@Query("email") email: string) {
    return this.userService.findByEmail(email);
  }
}
