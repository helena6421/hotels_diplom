import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../Users/UserModule";
import { AuthService } from "./AuthService";
import { LocalStrategy } from "./LocalStrategy";
import { AuthController } from "./AuthController";
import { SessionSerializer } from "./SessionSerializer";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
