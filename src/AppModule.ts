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
import { AppService } from "./AppService";
import { AppController } from "./AppController";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_DB_CONNECTION"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "files"),
      serveRoot: "/files",
    }),
    UserModule,
    HotelApiModule,
    ReservationModule,
    AuthModule,
    UserManagementModule,
    ReservationApiModule,
    ChatModule,
    SupportRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, Gateway],
})
export class AppModule {}
