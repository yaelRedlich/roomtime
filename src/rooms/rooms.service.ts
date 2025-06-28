import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    ) { }
    //public methods

    async findAll(): Promise<Room[]> {
        return this.roomModel.find().exec();
    }

    async findOne(id: string): Promise<Room> {
        return this.roomModel.findById(id).exec().then(room => {
            if (!room) {
                throw new Error(`Room with ID ${id} not found`);
            }
            return room;
        });
    }
    //Business methods
    async createRoom(createRoomDto: any): Promise<Room> {
        const newRoom = new this.roomModel(createRoomDto);
        return newRoom.save();
    }
    async findMyRooms(ownerId: string) {
        return this.roomModel.find({ owner: ownerId }).exec();
    }

    async update(id: string, updateRoomDto: UpdateRoomDto, user: any) {
        const room = await this.roomModel.findById(id);
        if (!room) {
            throw new NotFoundException("Room with ID ${ id } not found");
        }
        if (room.owner.toString() !== user.userId && user.role !== 'admin') {
            throw new ForbiddenException('You are not authorized to update this room');
        }

        return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true });
    }

    async deleteByID(id: string, user: any) {
        const room = await this.roomModel.findById(id);
        if (!room) {
            throw new NotFoundException("Room with ID ${ id } not found");
        }
        if (room.owner.toString() !== user.userId && user.role !== 'admin') {
            throw new ForbiddenException('You are not authorized to update this room');
        }
        return this.roomModel.deleteOne({ _id: id }).exec().then(result => {
            if (result.deletedCount === 0) {
                throw new NotFoundException(`Room with ID ${id} not found`);
            }
            return { message: 'Room deleted successfully' };
        });

    }
     
    //admin methods
}
