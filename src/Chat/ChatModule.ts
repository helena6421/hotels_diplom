import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SupportRequestModule } from "src/SupportRequests/SupportRequestModule";
import {
  SupportRequest,
  SupportRequestSchema,
} from "src/SupportRequests/SupportRequestSchema";
import { ChatClientController } from "./ChatClientController";
import { ChatEmployeeController } from "./ChatEmployeeController";
import { ChatController } from "./ChatController";
import { ChatService } from "./ChatService";

@Module({
  imports: [
    SupportRequestModule,
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  controllers: [ChatController, ChatClientController, ChatEmployeeController],
  providers: [ChatService],
})
export class ChatModule {}
