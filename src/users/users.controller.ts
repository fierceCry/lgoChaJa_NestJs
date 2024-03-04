import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoinRequserDto } from './dto/users.requser.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/loca-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService){
  }

  @ApiOperation({
    summary : "유저 정보 조회"
  })
  @Get('/get')
  getUser(){
    return;
  }

  @ApiOperation({
    summary : "회원가입"
  })
  @ApiResponse({
    status : 201,
    description : "{ data: ok }"
  })
  @ApiResponse({
    status : 400,
    description : "{ data : email must be a string, email must be an email }"
  })
  @ApiResponse({
    status : 403,
    description : "{ data:이미 존재하는 사용자입니다 }"
  })
  @UseGuards(new NotLoggedInGuard())
  @Post('/post')
  async signUp(@Body() data: JoinRequserDto){
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(){
    return;
  }

  @ApiOperation({
    summary : "로그아웃"
  })
  @UseGuards(new LoggedInGuard())
  @Post("logout")
  logOut(){

  }
}

