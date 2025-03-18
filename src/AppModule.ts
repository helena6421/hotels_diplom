import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./Users/UserModule";
import { ReservationModule } from "./Reservations/ReservationModule";
import { AuthModule } from "./Auth/AuthModule";
import { ConfigModule } from "@nestjs/config";
import { UserManagementModule } from "./UserManagement/UserManagementModule";
import { HotelApiModule } from "./HotelsApi/HotelApiModule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ReservationApiModule } from "./ReservationsApi/ReservationApiModule";
import { ChatModule } from "./Chat/ChatModule";
import { Gateway } from "./Chat/Gateway";
import { SupportRequestModule } from "./SupportRequests/SupportRequestModule";

@Module({
  imports: [
    UserModule,
    HotelApiModule,
    ReservationModule,
    AuthModule,
    UserManagementModule,
    ReservationApiModule,
    ChatModule,
    SupportRequestModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "files"),
      serveRoot: "/files",
    }),
  ],
  providers: [Gateway],
})
export class AppModule {}
