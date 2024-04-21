import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/loca-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(
    private userService: UsersService,){
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
    image : http://k.kakaocdn.net/dn/BK2Go/btsvMFdmAnc/EiuRgwn5bioUA9cTEFmF7K/img_640x640.jpg,
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
  async login(@User() user: Users){
    return user;
  }

  @ApiOperation({
    summary : "로그아웃"
  })
  @ApiResponse({
    status: 200,
    description : 'ok'
  })
  @ApiResponse({
    status: 400,
    description : 'session delete err'
  })
  @UseGuards(new LoggedInGuard())
  @Get("/logout")
  async logOut(@Req() req, @Res() res){
    req.session.destroy((err) => {
      if (err) {
        return new BadRequestException('session err')
      }
      res.clearCookie('connect.sid', { httpOnly: true });
      return res.status(200).send();
    });
  }

  @Get('find/email')
  async findEmail(
    @Param('email') email:string
  ){
    return this.userService.findEmail(email)
  }

  @Get('find/password')
  async findPassword(
    @Param('email') email: string,
  ) {
    return this.userService.findPassword(email);

  }

}