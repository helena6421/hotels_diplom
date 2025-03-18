import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/Guards/AdminGuard";
import { AuthenticatedGuard } from "src/Guards/AuthGuard";
import { CreateHotelDto } from "./Dtos/CreateHotelDto";
import { UpdateHotelDto } from "./Dtos/UpdateHotelDto";
import { HotelApiService } from "./HotelApiService";
import { SearchHotelParams } from "./Interfaces/HotelApiInterface";

@Controller()
export class HotelApiController {
  constructor(private readonly hotelsApiService: HotelApiService) {}
  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Post("/api/admin/hotels")
  createHotel(@Body() data: CreateHotelDto) {
    return this.hotelsApiService.create(data);
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Get("/api/admin/hotels")
  searchHotel(@Query() params: SearchHotelParams) {
    return this.hotelsApiService.search(params);
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Put("/api/admin/hotels/:id")
  updateHotel(@Param("id") id: string, @Body() params: UpdateHotelDto) {
    return this.hotelsApiService.update(id, params);
  }
}
