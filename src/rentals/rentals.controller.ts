import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { CurrentUser } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('rentals')
export class RentalsController {
    constructor(private readonly rentalsService: RentalsService) {}

    // Public methods
    @Post('')  
    @UseGuards(JwtAuthGuard)   
    create(@Body() rentals: CreateRentalDto, @CurrentUser() user: any) {
      
        return this.rentalsService.create({
            ...rentals,
            userId: user.userId, 
          });
    }
    @Post(':id')
    @UseGuards(JwtAuthGuard)   
    update( @Param('id') id: string ,@Body() rentals: CreateRentalDto, @CurrentUser() user: any) {
        return this.rentalsService.update(id,rentals,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)   
    delete( @Param('id') id: string  ,@CurrentUser() user: any) {
        return this.rentalsService.deleteByID(id, user);
    }

    //bessiness methods

    
    //admin methods
}
