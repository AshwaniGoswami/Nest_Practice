import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [UsersController],
})
export class AppModule {}
