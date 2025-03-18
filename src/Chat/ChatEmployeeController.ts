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
import { ManagerGuard } from "src/Guards/ManagerGuard";
import { ISearchSupportRequestParams } from "src/SupportRequests/Interfaces/SupportRequestSearchInterface";
import { SupportRequestEmployeeService } from "src/SupportRequests/SupportRequestEmployeeService";

@Controller()
export class ChatEmployeeController {
  constructor(
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService
  ) {}

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get("api/manager/support-requests")
  searchSupportRequests(@Query() params: ISearchSupportRequestParams) {
    return this.supportRequestEmployeeService.searchSupportRequests(params);
  }
}
