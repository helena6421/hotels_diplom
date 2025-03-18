import { Module } from "@nestjs/common";
import { ReservationModule } from "src/Reservations/ReservationModule";
import { ReservationApiController } from "./ReservationApiController";
import { ReservationApiService } from "./ReservationApiService";

@Module({
  imports: [ReservationModule],
  controllers: [ReservationApiController],
  providers: [ReservationApiService],
})
export class ReservationApiModule {}
