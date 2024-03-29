import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KakaoAuthGuard } from './kakao/kakao.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { googleAuthGuard } from './google/google.guard';
import { LocalAuthGuard } from './loca-auth.guard';
import { NaverAuthGuard } from './naver/naver.guard';

@ApiTags("SOCIAL")
@Controller('/auth')
export class AuthController {

  @ApiOperation({
    summary : '카카오 로그인'
  })
  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoLogin() {
  }

  @ApiOperation({
    summary : '카카오 로그인 리다이렉션'
  })
  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  kakaoAuthRedirect(
    @Res() res: Response) {
    res.redirect("/")
  }

  @ApiOperation({
    summary : '구글 로그인'
  })
  @Get('/google')
  @UseGuards(googleAuthGuard)
  googleAuth(@Req() req) {}

  @ApiOperation({
    summary : '구글 로그인 리다이렉션'
  })
  @Get('/google/callback')
  @UseGuards(googleAuthGuard)
  googleAuthRedirect(@Res() res: Response) {
    res.redirect("/")
  }

  @ApiOperation({
    summary : '네이버 로그인'
  })
  @Get('/naver/oauth2')
  @UseGuards(NaverAuthGuard)
  naverAuth(@Req() req) {}

  @ApiOperation({
    summary : '네이버 로그인 리다이렉션'
  })
  @Get('/naver/oauth2/callback')
  @UseGuards(NaverAuthGuard)
  naverAuthRedirect(@Res() res: Response) {
    res.redirect("/")
  }
}

