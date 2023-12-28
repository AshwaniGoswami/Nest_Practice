import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.AuthService.login(dto);
  }
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.AuthService.signup(dto);
  }
}
