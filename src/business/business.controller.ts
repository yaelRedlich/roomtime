import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { CurrentUser, Role } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {

    constructor(private readonly businessService: BusinessService) {}
     // public methods
   @UseGuards(JwtAuthGuard)
   @Post('')
    createBusiness(@Body() business: CreateBusinessDto, @CurrentUser() user: any) {
        return this.businessService.createBusiness({
            ...business,
            owner: user.userId, 
          });
        }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @Role('business')
    update( @Param('id') id: string , @Body() business: UpdateBusinessDto ,@CurrentUser() user: any) {
        return this.businessService.update(id, business, user);
        
        }

     // Business methods



     // admin methods

}
