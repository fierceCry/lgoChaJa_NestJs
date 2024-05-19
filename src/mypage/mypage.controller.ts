import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MYPAGE')
@Controller('api/mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @ApiOperation({
    summary: '유저 Mypage 조회',
  })
  @ApiResponse({
    status: 200,
    description: `
    {
      "email": "aa4518@naver.com",
      "nickname": "김만규",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU",
      "follower_count": "0",
      "posts": [
          {
              "id": 1,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          },
          {
              "id": 2,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          },
          {
              "id": 3,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          }
      ]
  }
    `,
  })
  @Get('/detail')
  @UseGuards(new LoggedInGuard())
  async getUserDetails(
    @User() user: Users,
  ) {
    return await this.mypageService.getUserDetails(user.id);
  }

  @ApiOperation({
    summary: '유저 패스워드 수정',
  })
  @ApiResponse({
    status: 200,
    description: `
    패스워드 변경되었습니다.
    `,
  })
  @ApiResponse({
    status: 404,
    description: `
    기존 패스워드가 틀립니다.
    `,
  })
  @Patch('/setting/password')
  @UseGuards(new LoggedInGuard())
  async passwordChange(
    @User() user: Users,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string
  ){
    return await this.mypageService.passwordChange(user.id, password, newPassword)
  }

  @ApiOperation({
    summary: '다른 유저 Mypage 조회',
  })
  @ApiResponse({
    status: 200,
    description: `
    {
      "email": "aa4518@naver.com",
      "nickname": "김만규",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnQZkG7cTDC8HO4uZ4e_6Xv2ikGA3TR9VIA&usqp=CAU",
      "follower_count": "0",
      "posts": [
          {
              "id": 1,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          },
          {
              "id": 2,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          },
          {
              "id": 3,
              "tags": "#패션",
              "post_title": "이건 누가 입었을까요?",
              "post_content": "아티스트 패션에 대해서 궁금합니다.",
              "category_name": "음식",
              "comment_count": 0
          }
      ]
  }
    `,
  })
  @Get('/users/:userId')
  @UseGuards(new LoggedInGuard())
  async otherUserDetailPage(
    @Param('userId') otherId: number
  ){
    return await this.mypageService.getUserDetails(otherId)
  }
}
