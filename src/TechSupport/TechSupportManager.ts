import { MarkMessagesAsReadDto } from "./Dtos/MarkMessagesAsReadDto";
import { ISupportRequestEmployeeService } from "./Interfaces/TechSupportInterface";
import { Message } from "./MessageSchema";
import { SupportRequest } from "./TechSupportSchema";

export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    throw new Error("Method not implemented.");
  }
  getUnreadCount(SupportRequest: string): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  closeRequest(SupportRequest: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
