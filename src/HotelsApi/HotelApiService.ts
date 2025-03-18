import { Injectable } from "@nestjs/common";
import { HotelService } from "src/Hotels/HotelService";
import { CreateHotelDto } from "./Dtos/CreateHotelDto";
import { UpdateHotelDto } from "./Dtos/UpdateHotelDto";
import { SearchHotelParams } from "src/Hotels/Interfaces/HotelInterface";

@Injectable()
export class HotelApiService {
  constructor(private readonly hotelsService: HotelService) {}

  create(data: CreateHotelDto) {
    return this.hotelsService.create(data);
  }

  search(params: SearchHotelParams) {
    return this.hotelsService.search(params);
  }

  update(id: string, params: UpdateHotelDto) {
    return this.hotelsService.update(id, params);
  }
}
