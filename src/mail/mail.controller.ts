import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';

@ApiTags('MAIL')
@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({
    summary: '유저 email 찾기',
  })
  @ApiResponse({
    status: 200,
    description: `
    data: 인증코드를 전송했습니다.
    `,
  })
  @ApiResponse({
    status: 404,
    description: `
    존재하지 않는 사용자입니다
    `,
  })
  @Post('send-code/:email')
  async sendEmail(@User() user: Users, @Body('email') email: string) {
    return await this.mailService.sendEmail(user.id, email);
  }

  @ApiOperation({
    summary: '유저 email 인증코드',
  })
  @ApiResponse({
    status: 200,
    description: `
      data: TKD2KD
      `,
  })
  @ApiResponse({
    status: 404,
    description: `
      data: 유효한 코드가 아닙니다.
      `,
  })
  @Get('verify-code/:verificationCode/:email')
  async verifyEmailCode(
    @User() user: Users,
    @Param('verificationCode') verificationCode: string,
    @Param('email') email: string,
  ) {
    return await this.mailService.verifyEmailCode(user.id, verificationCode, email);
  }

  @ApiOperation({
    summary: '유저 password 찾기',
  })
  @ApiResponse({
    status: 200,
    description: `
    data: 임시 비밀번호를 전송했습니다.
    `,
  })
  @ApiResponse({
    status: 404,
    description: `
      이메일 전송 중 오류가 발생했습니다.
    `,
  })
  @Post('reset-password/:email')
  async sendPasswordResetEmail(
    @Body('email') email: string,
    @Body('social') social:string
  ) {
    return await this.mailService.sendPasswordResetEmail(social, email);
  }
}
