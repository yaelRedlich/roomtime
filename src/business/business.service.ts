import { Body, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { CurrentUser } from 'src/auth/roles.decorator';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
    constructor(
        @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    ) { }
    // business methods
    async createBusiness(business: any) {
        const newBusiness = new this.businessModel(business);
        return newBusiness.save();
    }

    async update(id: string, business: UpdateBusinessDto, user: any) {
        const busines = await this.businessModel.findById(id);
        if (!busines) {
            throw new NotFoundException("business with ID ${ id } not found");
        }
        if (busines.owner.toString() !== user.userId && user.role !== 'admin') {
            throw new ForbiddenException('You are not authorized to update this business');
        }

        return this.businessModel.findByIdAndUpdate(id, business, { new: true });
    }
//מחיקת עסק צריך??
}
