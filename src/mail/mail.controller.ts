// MailController
import { Controller, Get, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { UsersService } from 'src/users/users.service';

@Controller('api/mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UsersService,
  ) {}

  @Get(':email')
  async sendEmail(@Param('email') email: string) {
      return await this.mailService.sendEmail(email);
    }
  

  @Get(':verificationCode/:email')
  async emailCertified(
    @Param('verificationCode') verificationCode: string,
    @Param('email') email: string,
  ) {
    return await this.mailService.verifyCode(verificationCode, email);
  }
}