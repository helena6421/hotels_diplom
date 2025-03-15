import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateHotelDto } from "./Dtos/CreateHotelDto";
import { Hotel, HotelDocument } from "./HotelSchema";
import { IHotelService } from "./Interfaces/HotelInterface";

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>
  ) {}

  create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelDto);
    return createdHotel.save().then(({ id }) => {
      return this.hotelModel.findById(id, "title description");
    });
  }

  findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  search(params: Pick<Hotel, "title">): Promise<Hotel[]> {
    return this.hotelModel
      .find(
        { title: { $regex: new RegExp(params.title, "i") } },
        "title description"
      )
      .exec();
  }

  update(id: string, data: Partial<Hotel>): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, data).exec();
  }
}
