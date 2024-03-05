import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/loca-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService){
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({
    summary : "유저 정보 조회"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    id : 1,
    email : "vlsual0917@gmail.com,
    nickname : 김만규,
    image : http://,
    explain : 안녕하세요 OOO입니다
    `
  })
  @Get('/lgoChaja/get')
  async getUser(@User() user: Users){
    return this.userService.getUser(
      user.id
      )
  }

  @ApiOperation({
    summary : "회원가입"
  })
  @ApiResponse({
    status : 201,
    description : `data: ok`
  })
  @ApiResponse({
    status : 400,
    description : `data : email must be a string, email must be an email`
  })
  @ApiResponse({
    status : 403,
    description : `data:이미 존재하는 사용자입니다`
  })
  @UseGuards(new NotLoggedInGuard())
  @Post('/post')
  async signUp(@Body() data: UserCreateDto){
    const result = await this.userService.signUp(
      data.email, 
      data.nickname, 
      data.password,
      data.social);
    return { data : result };
  }

  @ApiOperation({
    summary : "로그인"
  })
  @ApiResponse({
    status : 201,
    description : "ok"
  })
  @ApiResponse({
    status : 401,
    description : `data: Unauthorized`
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: UserLoginDto){
  }

  @ApiOperation({
    summary : "로그아웃"
  })
  @UseGuards(new LoggedInGuard())
  @Post("logout")
  logOut(){

  }
}

