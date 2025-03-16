import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./Users/UserModule";
import { HotelModule } from "./Hotels/HotelModule";
import { ReservationModule } from "./Reservations/ReservationModule";
@Module({
  imports: [
    UserModule,
    HotelModule,
    ReservationModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
  ],
})
export class AppModule {}
