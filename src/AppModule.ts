import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/UserModule';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
  ],
})
export class AppModule {}
