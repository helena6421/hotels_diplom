import { CreateSupportRequestDto } from "../Dtos/CreateSupportRequestDto";
import { MarkMessagesAsReadDto } from "../Dtos/MarkMessagesAsReadDto";
import { SendMessageDto } from "../Dtos/SendMessageDto";
import { Message } from "../MessageSchema";
import { SupportRequest } from "../TechSupportSchema";

export interface ICreateSupportRequestDto {
  user: string;
  text: string;
}

export interface ISendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}
export interface IMarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface IGetChatListParams {
  user: string | null;
  isActive: boolean;
}

export interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void
  ): void;
}

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<number>;
}

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}
