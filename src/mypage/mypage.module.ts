import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { MypageController } from './mypage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [MypageController],
  providers: [MypageService]
})
export class MypageModule {}
