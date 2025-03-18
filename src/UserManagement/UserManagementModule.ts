import { Module } from "@nestjs/common";
import { UserModule } from "src/Users/UserModule";
import { UserManagementController } from "./UserManagementController";
import { UserManagementService } from "./UserManagementService";

@Module({
  imports: [UserModule],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
