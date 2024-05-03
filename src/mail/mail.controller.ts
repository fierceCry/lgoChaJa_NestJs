import { Controller, Get, Param} from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MAIL')
@Controller('api/mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @ApiOperation({
    summary : "유저 email 찾기"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    data: 인증코드를 전송했습니다.
    `
  })
  @ApiResponse({
    status: 404,
    description : 
    `
    존재하지 않는 사용자입니다
    `
  })
  @Get('id/:email')
  async sendEmail(@Param('email') email: string) {
      return await this.mailService.sendEmail(email);
    }

  
    @ApiOperation({
      summary : "유저 email 인증코드"
    })
    @ApiResponse({
      status: 200,
      description : 
      `
      data: TKD2KD
      `
    })
    @ApiResponse({
      status: 404,
      description : 
      `
      data: 유효한 코드가 아닙니다.
      `
    })
  @Get('certify/:verificationCode/:email')
  async emailCertified(
    @Param('verificationCode') verificationCode: string,
    @Param('email') email: string,
  ) {
    return await this.mailService.verifyCode(verificationCode, email);
  }

  @ApiOperation({
    summary : "유저 password 찾기"
  })
  @ApiResponse({
    status: 200,
    description : 
    `
    data: 임시 비밀번호를 전송했습니다.
    `
  })
  @ApiResponse({
    status: 404,
    description : 
    `
      이메일 전송 중 오류가 발생했습니다.
    `
  })
  @Get('password/:email')
  async sendPasswordResetEmail(@Param('email') email: string){
    return await this.mailService.sendPasswordResetEmail(email);
  }
}