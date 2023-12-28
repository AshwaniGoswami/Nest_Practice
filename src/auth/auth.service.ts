import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      await this.prisma.users.create({
        data: {
          password: hash,
          email: dto.email,
          mobile: dto.mobile,
          firstName: dto.firstName,
          lastname: dto.lastName,
        },
      });

      return { message: 'signup successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      return error;
    }
  }
  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException('Credentials incorrect');
      const pwMatches = await argon.verify(user.password, dto.password);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
      delete user.password;
      const token = await this.signToken(user.id, user.email);
      return { message: 'login successfully', token };
    } catch (error) {
      return error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload: {
      sub: number;
      email: string;
    } = {
      sub: userId,
      email: email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_token: token };
  }
}
