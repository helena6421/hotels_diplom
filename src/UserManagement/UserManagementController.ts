import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/Guards/AdminGuard";
import { AuthenticatedGuard } from "src/Guards/AuthGuard";
import { ManagerGuard } from "src/Guards/ManagerGuard";
import { UserService } from "src/Users/UserService";
import { CreateUserDto } from "./Dtos/CreateUserDto";
import { SearchUserParams } from "./Interfaces/SearchUserInterface";
import { UserManagementService } from "./UserManagementService";

@Controller()
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly usersService: UserService
  ) {}

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Post("api/admin/users")
  async create(@Body() data: CreateUserDto) {
    const userDocument = await this.userManagementService.create(data);
    return {
      _id: userDocument._id,
      email: userDocument.email,
      name: userDocument.name,
      contactPhone: userDocument.contactPhone,
      role: userDocument.role,
    };
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Get("/api/admin/users")
  async findAllForAdmin(@Query() params: SearchUserParams) {
    return this.usersService.findAll(params);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get("/api/manager/users")
  async findAllForManager(@Query() params: SearchUserParams) {
    return this.usersService.findAll(params);
  }
}
