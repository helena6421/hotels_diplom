import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./Users/UserModule";
import { HotelModule } from "./Hotels/HotelModule";
@Module({
  imports: [
    UserModule,
    HotelModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
  ],
})
export class AppModule {}
