import { LoginDto, SignupDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: SignupDto): Promise<any>;
    login(dto: LoginDto): Promise<any>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
