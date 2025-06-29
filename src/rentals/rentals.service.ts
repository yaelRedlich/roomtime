import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rental, RentalDocument } from './schemas/rental.schema';
import { Model } from 'mongoose';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { log } from 'console';

@Injectable()
export class RentalsService {
    constructor(
        @InjectModel(Rental.name) private RentalModel: Model<RentalDocument>,
        @InjectModel(Room.name) private RoomModel: Model<RoomDocument>,

    ) { }

    // Public methods

    async create(dto: any) : Promise<Rental> {
        const room = await this.RoomModel.findById(dto.roomId);                
        if (!room)
             throw new NotFoundException('Room not found');
        const conflict = await this.RentalModel.findOne({
          roomId: dto.roomId,
          status: { $in: ['pending', 'approved'] },
          $or: [
            {
              startDate: { $lt: dto.endDate },
              endDate: { $gt: dto.startDate },
            },
          ],
        });
        if (conflict) throw new ConflictException('Room already booked at this time');
      
        // שלב 3: ליצור את ההשכרה עם כל השדות הנדרשים
        const rental = new this.RentalModel({
          ...dto,
          businessId: room.owner, 
        });
      
        return rental.save();
      }
      

    async update(id:string ,rental: any,user:any): Promise<Rental> {
        const findRental = await this.RentalModel.findById(id);
        if (!findRental) {
            throw new NotFoundException("rental with ID ${ id } not found");
        }

        if (findRental.userId.toString() !== user.userId && user.role !== 'admin' ) {
            throw new ForbiddenException('You are not authorized to update this rental');
        }

        const overlapping = await this.RentalModel.findOne({
            roomId: rental.roomId,
            status: { $in: ['pending', 'approved'] },
            $or: [
              {
                startDate: { $lt: rental.endDate },
                endDate: { $gt: rental.startDate },
              },
            ],
          });

        if (overlapping) {
            throw new Error('Rental overlaps with an existing booking.');
        }

        const createdRental = new this.RentalModel(rental);
        return await createdRental.save();
    }
 
    async deleteByID(id: string, user: any) {
        const rental = await this.RentalModel.findById(id);
        if (!rental) {
            throw new NotFoundException("rental with ID ${ id } not found");
        }
        if (rental.userId.toString() !== user.userId && user.role !== 'admin' ) {
            throw new ForbiddenException('You are not authorized to update this rental');
        }
        return this.RentalModel.deleteOne({ _id: id }).exec().then(result => {
            if (result.deletedCount === 0) {
                throw new NotFoundException(`rental with ID ${id} not found`);
            }
            return { message: 'rental deleted successfully' };
        });

    }

    //bessiness methods


    //admin methods
}
