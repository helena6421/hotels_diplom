import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Message, MessageSchema } from "./MessageSchema";
import { SupportRequestClientService } from "./SupportRequestClientService";
import { SupportRequestEmployeeService } from "./SupportRequestEmployeeService";
import { SupportRequest, SupportRequestSchema } from "./SupportRequestSchema";
import { SupportRequestService } from "./SupportRequestService";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportRequestService,
  ],
  exports: [
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportRequestService,
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
})
export class SupportRequestModule {}
