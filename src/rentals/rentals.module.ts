import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rental, RentalSchema } from './schemas/rental.schema';
import { Room, RoomSchema } from 'src/rooms/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rental.name, schema: RentalSchema },  {  name: Room.name, schema: RoomSchema  }
    ]),
    ],
  providers: [RentalsService],
  controllers: [RentalsController]
})
export class RentalsModule {}
