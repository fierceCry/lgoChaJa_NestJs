import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';

@Controller('api/mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get('/detail')
  async findFollowedUsers(
    @User() user: Users,
  ) {
    return await this.mypageService.findFollowedUsers(user.id);
  }

  @Patch('/setting/password/:password/:newPassword')
  async passwordChage(
    @User() user: Users,
    @Param('password') password: string,
    @Param('newPassword') newPassword: string
  ){
    return await this.mypageService.password(user.id, password, newPassword)
  }

  @Get('/other/detail/:other')
  async otherUserDetailPage(
    @Param('other') otherId: number
  ){
    console.log(otherId)
    return await this.mypageService.findFollowedUsers(otherId)
  }
}
