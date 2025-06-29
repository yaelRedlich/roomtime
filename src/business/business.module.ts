
import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSchema } from './schemas/business.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Business', schema: BusinessSchema },
    ]),
  ],
  controllers: [BusinessController], 
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
