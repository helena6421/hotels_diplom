import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/UserModule';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
  ],
})
export class AppModule {}
