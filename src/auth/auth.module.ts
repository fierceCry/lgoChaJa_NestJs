import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serializer';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './kakao/kakao-strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { GoogleStrategy } from './google/google-strategy';
import { NaverStrategy } from './naver/naver.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer, KakaoStrategy, GoogleStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}