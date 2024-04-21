// MailService
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Users)
    private usersRepository : Repository<Users>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(email: string) {
    const result = await this.usersService.findEmail(email);
    if (!result) {
      return { data: '존재하지 않는 이메일입니다.' };
    }
  
    const temporaryCode = this.generateTemporaryCode();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
  
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'lgoChaja',
        html: `<p>lgoChaja에서 인증코드: <strong>${temporaryCode}</strong>드립니다.</p>`,
      });
      
      await this.usersRepository.update({ email: email }, { verificationCode: temporaryCode, expirationTime: expirationTime });
  
      return { data: '인증코드를 전송했습니다.' };
    } catch{
      return { data: '이메일 전송 중 오류가 발생했습니다.' };
    }
  }

  private generateTemporaryCode(): string {
    const temporaryCode = randomBytes(3).toString('hex').toUpperCase(); 
    return temporaryCode;
  }

  async verifyCode(verificationCode: string, email: string) {
    const user = await this.usersRepository.findOne({ where: { email, verificationCode } });
    if (user && user.expirationTime > new Date()) {
        return { data: user.email };
    } else {
        return { data: '유효한 코드가 아닙니다.' };
    }
}
}