import { Module } from "@nestjs/common";
import { ReservationService } from "./ReservationService";
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./ReservationSchema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
