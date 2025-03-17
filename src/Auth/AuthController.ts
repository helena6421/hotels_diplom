import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/Guards/AuthGuard";
import { UnauthenticatedGuard } from "src/Guards/UnauthGuard";
import { User } from "src/Users/UserSchema";
import { AuthService } from "./AuthService";
import { RegisterUserDto } from "./Dtos/RegisterUserDto";
import { LocalAuthGuard } from "../Guards/LocalAuthGuard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UnauthenticatedGuard)
  @Post("api/client/register")
  async register(@Body() data: RegisterUserDto) {
    const userDocument = await this.authService.register(data);
    return {
      _id: userDocument._id,
      email: userDocument.email,
      name: userDocument.name,
    };
  }

  @UseGuards(UnauthenticatedGuard, LocalAuthGuard)
  @Post("api/auth/login")
  login(@Request() req) {
    const userDocument: User = req.user._doc;
    return {
      email: userDocument.email,
      name: userDocument.name,
      contactPhone: userDocument.contactPhone,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("api/auth/logout")
  logout(@Request() req) {
    req.logout();
  }
}
