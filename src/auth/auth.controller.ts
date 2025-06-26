import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        try {
            return this.authService.login(loginDto);
        }
        catch (erro) {
            throw new UnauthorizedException('Invalid email or password');
        }
    }
}
