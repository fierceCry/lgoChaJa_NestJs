import { Controller, Get } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';

@Controller('mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get('/detail')
  async userPage(
    @User() user: Users,
  ) {
    return await this.mypageService.userPage(user.id);
  }
}
