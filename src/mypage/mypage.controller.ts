import { Controller, Get } from '@nestjs/common';
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
}
