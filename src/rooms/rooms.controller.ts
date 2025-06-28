import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CurrentUser, Role } from 'src/auth/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}
  //public methods

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }



  //admin methods

// Business methods
@Get('my')
@UseGuards(JwtAuthGuard)
findMyRooms(@CurrentUser() user: any) {
   return this.roomsService.findMyRooms(user.userId);
}


@UseGuards(JwtAuthGuard)
@Patch(':id')
@Role('business')
update( @Param('id') id: string , @Body() updateRoomDto: UpdateRoomDto ,@CurrentUser() user: any) {
    return this.roomsService.update(id, updateRoomDto, user);
}

@Post()
@Role('business')
@UseGuards(JwtAuthGuard)
createRoom(@Body() createRoomDto: CreateRoomDto, @CurrentUser() user: any) {
  return this.roomsService.createRoom({
    ...createRoomDto,
    owner: user.userId, 
  });
}

@Delete(':id')
@UseGuards(JwtAuthGuard)
@Role('business')
delete( @Param('id') id: string  ,@CurrentUser() user: any) {
    return this.roomsService.deleteByID(id, user);
}

}
