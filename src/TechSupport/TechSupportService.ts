import { SendMessageDto } from "./Dtos/SendMessageDto";
import {
  IGetChatListParams,
  ISupportRequestService,
} from "./Interfaces/TechSupportInterface";
import { Message } from "./MessageSchema";
import { SupportRequest } from "./TechSupportSchema";

export class SupportRequestService implements ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    throw new Error("Method not implemented.");
  }
  sendMessage(data: SendMessageDto): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  getMessages(supportRequest: string): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void
  ): () => void {
    throw new Error("Method not implemented.");
  }
}
