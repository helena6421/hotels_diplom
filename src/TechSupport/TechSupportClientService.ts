import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateSupportRequestDto } from "./Dtos/CreateSupportRequestDto";
import { MarkMessagesAsReadDto } from "./Dtos/MarkMessagesAsReadDto";
import { ISupportRequestClientService } from "./Interfaces/TechSupportInterface";
import { Message, MessageDocument } from "./MessageSchema";
import { SupportRequest, SupportRequestDocument } from "./TechSupportSchema";
import { ISearchSupportRequestParams } from "./Interfaces/TechSupportSearchInterface";
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>
  ) {}

  searchSupportRequests(user: string, params: ISearchSupportRequestParams) {
    const queryFilter: FilterQuery<SupportRequestDocument> = {};

    if (user) {
      queryFilter.user = user;
    }

    if (params && params.isActive) {
      queryFilter.isActive = params.isActive;
    }

    return this.supportRequestModel
      .find(queryFilter, "createdAt isActive")
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
  }

  async createSupportRequest(
    data: CreateSupportRequestDto
  ): Promise<SupportRequest> {
    const createdMessage = new this.messageModel({
      author: data.user,
      text: data.text,
    });
    const res = await createdMessage.save();
    const createdSupportRequest = new this.supportRequestModel({
      user: data.user,
      messages: [res._id],
      isActive: true,
    });
    return await createdSupportRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const filterQuery: FilterQuery<SupportRequestDocument> = {};

    if (params.user) {
      filterQuery.user = params.user;
    }

    if (params.supportRequest) {
      filterQuery._id = params.supportRequest;
    }

    const supportRequestDocument = await this.supportRequestModel
      .findById(filterQuery._id)
      .exec();
    await this.messageModel.updateMany(
      {
        _id: { $in: supportRequestDocument.messages },
        author: filterQuery.user,
      },
      { readAt: new Date(params.createdBefore) }
    );
    return { success: true };
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    const supportRequestDocument = await this.supportRequestModel
      .findById(supportRequest)
      .populate("user")
      .populate("messages")
      .exec();
    return supportRequestDocument.messages.length;
  }
}
