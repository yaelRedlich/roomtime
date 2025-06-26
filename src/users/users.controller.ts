import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser, Role } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserAccessGuard } from './user-access.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('createUser')
  async create(@Body() createUserDto: CreateUserDto ,  @Req() req: any) {
    try {      
      const user = req.user;
      const currentRole = user?.role;
      return this.usersService.create(createUserDto, currentRole);
    }
    catch (error) {
      throw new ConflictException('Email already exists');

    }
  }

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)  @Role('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserAccessGuard)
  @Get('me')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserAccessGuard)
  @Patch('me') 
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: any) {
    
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, UserAccessGuard)
  @Delete('me')
  remove(@Param('id') id: string ,  @CurrentUser() user: any) {
    return this.usersService.remove(id);
  }
}
