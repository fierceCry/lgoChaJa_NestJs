import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JoinRequserDto } from './dto/users.requser.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {

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
  @Post('post')
  PostUser(@Body() data: JoinRequserDto){
    return;
  }

  @ApiOperation({
    summary : "로그인"
  })
  @Post('login')
  login(){
    return;
  }

  @ApiOperation({
    summary : "로그아웃"
  })
  @Post("logout")
  logOut(){

  }
}

