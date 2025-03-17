import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./Users/UserModule";
import { HotelModule } from "./Hotels/HotelModule";
import { ReservationModule } from "./Reservations/ReservationModule";
import { AuthModule } from "./Auth/AuthModule";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    HotelModule,
    ReservationModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
