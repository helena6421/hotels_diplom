import { Injectable } from "@nestjs/common";
import { UpdateHotelRoomDto } from "src/Hotels/Dtos/UpdateHotelRoomDto";
import { HotelRoomsService } from "src/Hotels/HotelRoomService";
import { CreateHotelRoomDto } from "./Dtos/CreateHotelRoomDto";
import { SearchRoomParams } from "./Interfaces/HotelApiInterface";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

@Injectable()
export class HotelRoomApiService {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  search(user, params: SearchRoomParams) {
    if (!user || user.role === "client") {
      return this.hotelRoomsService.search({
        ...params,
        isEnabled: true,
      });
    }

    return this.hotelRoomsService.search(params);
  }

  findById(user, id: string) {
    return this.hotelRoomsService.findById(id, !user || user.role === "client");
  }

  create(
    data: Overwrite<CreateHotelRoomDto, { images: Array<Express.Multer.File> }>
  ) {
    const dataWithStringifiedImages = {
      ...data,
      images: data.images.map((image) => encodeURI(image.path)),
    };
    return this.hotelRoomsService.create(dataWithStringifiedImages);
  }

  update(
    id: string,
    data: Overwrite<UpdateHotelRoomDto, { images: string[] }>
  ) {
    return this.hotelRoomsService.update(id, data);
  }
}
