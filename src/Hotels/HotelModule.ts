import { Module } from "@nestjs/common";
import { HotelService } from "./HotelService";
import { MongooseModule } from "@nestjs/mongoose";
import { Hotel, HotelSchema } from "./HotelSchema";
import { HotelRoom, HotelRoomSchema } from "./HotelRoomSchema";
import { HotelRoomsService } from "./HotelRoomService";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelService, HotelRoomsService],
  exports: [HotelService, HotelRoomsService],
})
export class HotelModule {}
