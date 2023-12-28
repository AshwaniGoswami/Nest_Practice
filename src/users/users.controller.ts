import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req) {
    return req.user;
  }
}
