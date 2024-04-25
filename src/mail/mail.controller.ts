import { Controller, Get, Param} from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('api/mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Get('id/:email')
  async sendEmail(@Param('email') email: string) {
      return await this.mailService.sendEmail(email);
    }

  @Get('certify/:verificationCode/:email')
  async emailCertified(
    @Param('verificationCode') verificationCode: string,
    @Param('email') email: string,
  ) {
    return await this.mailService.verifyCode(verificationCode, email);
  }

  @Get('password/:email')
  async sendPasswordResetEmail(@Param('email') email: string){
    return await this.mailService.sendPasswordResetEmail(email);
  }
}