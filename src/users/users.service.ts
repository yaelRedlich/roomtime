import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto, currentUserRole?: string) {
    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException(`User with ID ${createUserDto.email} already exists`);
    }
    if (!currentUserRole) {
      if (createUserDto.role !== 'user' && createUserDto.role !== 'business') {
        throw new ConflictException('Guests can only create users with role user or business');
      }
    }
    if (createUserDto.role === 'admin' && currentUserRole !== 'admin') {
      throw new ConflictException('Only admins can create another admin');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userToSave = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = new this.userModel(userToSave);
    return newUser.save();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec().then(user => {
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    });
  }
  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec().then(user => {
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    });
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec().then(user => {
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }



  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec().then(user => {
      if (!user) {
        return null;
      }
      return user;
    });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this.userModel.findOne({ phone }).exec().then(user => {
      if (!user) {
        return null;
      }
      return user;
    }
    )
  }
}
