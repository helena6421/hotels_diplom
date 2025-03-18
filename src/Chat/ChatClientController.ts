import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Query,
  Get,
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/Guards/AuthGuard";
import { ClientGuard } from "src/Guards/ClientGuard";
import { ISearchSupportRequestParams } from "src/SupportRequests/Interfaces/SupportRequestSearchInterface";
import { SupportRequestClientService } from "src/SupportRequests/SupportRequestClientService";

@Controller()
export class ChatClientController {
  constructor(
    private readonly supportRequestClientService: SupportRequestClientService
  ) {}

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Post("api/client/support-requests")
  createSupportRequest(@Request() req, @Body() data: { text: string }) {
    return this.supportRequestClientService.createSupportRequest({
      user: req.user._doc._id,
      text: data.text,
    });
  }

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Get("api/client/support-requests")
  searchSupportRequests(
    @Request() req,
    @Query() params: ISearchSupportRequestParams
  ) {
    return this.supportRequestClientService.searchSupportRequests(
      req.user._doc._id,
      params
    );
  }
}
