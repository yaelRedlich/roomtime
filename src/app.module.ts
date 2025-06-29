import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { BusinessModule } from './business/business.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  
  imports: [  MongooseModule.forRoot('mongodb://localhost:27017/roomtime'),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
   UsersModule, AuthModule, RoomsModule, BusinessModule, RentalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
