import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@Controller('api/mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get('/detail')
  @UseGuards(new LoggedInGuard())
  async getUserDetails(
    @User() user: Users,
  ) {
    return await this.mypageService.getUserDetails(user.id);
  }

  @Patch('/setting/password')
  @UseGuards(new LoggedInGuard())
  async passwordChange(
    @User() user: Users,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string
  ){
    return await this.mypageService.passwordChange(user.id, password, newPassword)
  }

  @Get('/users/:userId')
  @UseGuards(new LoggedInGuard())
  async otherUserDetailPage(
    @Param('userId') otherId: number
  ){
    console.log(otherId)
    return await this.mypageService.getUserDetails(otherId)
  }
}
