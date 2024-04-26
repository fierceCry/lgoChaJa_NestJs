import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { MypageController } from './mypage.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [MypageController],
  providers: [MypageService, UsersService]
})
export class MypageModule {}
