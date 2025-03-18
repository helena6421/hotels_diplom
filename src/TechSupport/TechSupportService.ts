import { SendMessageDto } from "./Dtos/SendMessageDto";
import {
  IGetChatListParams,
  ISupportRequestService,
} from "./Interfaces/TechSupportInterface";
import { Message, MessageDocument } from "./MessageSchema";
import { SupportRequest, SupportRequestDocument } from "./TechSupportSchema";
import { EventEmitter } from "events";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class SupportRequestService implements ISupportRequestService {
  newMessageEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>
  ) {}

  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel.find(params).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const newMessage = new this.messageModel({
      author: data.author,
      sentAt: new Date(),
      text: data.text,
      readAt: null,
    });

    const messageDocument = await newMessage.save();

    const targetSupportRequest = await this.supportRequestModel.findById(
      data.supportRequest
    );

    await targetSupportRequest.updateOne({
      $push: {
        messages: newMessage._id,
      },
    });

    const response = await this.messageModel
      .findById(messageDocument.id)
      .populate("author", "name");

    this.newMessageEmitter.emit("newMessage", targetSupportRequest, response);

    return response;
  }

  async getMessages(supportRequest: string): Promise<Message[]> {
    const supportRequestDocument = await this.supportRequestModel
      .findById(supportRequest)
      .populate({
        path: "messages",
        select: "sentAt text readAt",
        populate: { path: "author", select: "name" },
      })
      .exec();
    return supportRequestDocument.messages as unknown as Message[];
  }

  subscribe(
    handler: (supportRequest: SupportRequestDocument, message: Message) => void
  ): void {
    this.newMessageEmitter.on("newMessage", handler);
  }
}
