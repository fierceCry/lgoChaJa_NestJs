import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { KakaoAuthGuard } from './kakao.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("SOCIAL")
@Controller('/auth')
export class AuthController {

  @ApiOperation({
    summary : "카카오 로그인"
  })
  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoLogin() {
  }

  @ApiOperation({
    summary : "카카오 로그인 리다이렉션"
  })
  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  kakaoAuthRedirect(
    @Res() res: Response) {
    res.redirect("/")
  }
}

