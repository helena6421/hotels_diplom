import { Module } from "@nestjs/common";
import { AuthService } from "./AuthService";

@Module({
  providers: [AuthService],
})
export class AuthModule {}
