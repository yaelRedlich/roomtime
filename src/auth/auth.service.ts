import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {    
    const user = await this.usersService.findByEmail(loginDto.email);
    console.log(user+"user in auth service");
    console.log(loginDto);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { sub: user._id, role: user.role }; 
    const token = await this.jwtService.signAsync(payload);
    console.log(token+"token");
    return { access_token: token };
  }
  
  async decodeToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
