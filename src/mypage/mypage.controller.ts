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

  @Patch('/setting/password')
  async passwordChage(
    @User() user: Users,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string
  ){
    console.log(user.id)
    console.log(password)
    console.log(newPassword)
    return await this.mypageService.password(user.id, password, newPassword)
  }
}
