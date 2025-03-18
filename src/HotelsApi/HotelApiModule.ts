import { Module } from "@nestjs/common";
import { HotelRoomApiService } from "./HotelRoomApiService";
import { HotelApiController } from "./HotelApiController";
import { HotelModule } from "src/Hotels/HotelModule";
import { HotelApiService } from "./HotelApiService";
import { HotelRoomApiController } from "./HotelRoomApiController";

@Module({
  imports: [HotelModule],
  providers: [HotelApiService, HotelRoomApiService],
  controllers: [HotelApiController, HotelRoomApiController],
})
export class HotelApiModule {}
