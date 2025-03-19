import { Injectable, BadRequestException } from "@nestjs/common";
const bcrypt = require("bcryptjs");
import { UserService } from "src/Users/UserService";
import { RegisterUserDto } from "./Dtos/RegisterUserDto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async register(data: RegisterUserDto) {
    try {
      const passwordHash = await bcrypt.hash(data.password, 10);

      return await this.usersService.create({
        email: data.email,
        name: data.name,
        passwordHash,
        contactPhone: data.contactPhone,
        role: "client",
      });
    } catch (err) {
      const hasKeyDuplicate = err.code === 11000;
      if (hasKeyDuplicate) {
        throw new BadRequestException("Email is already exist");
      }
      throw new Error(err);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await this.validatePassword(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
