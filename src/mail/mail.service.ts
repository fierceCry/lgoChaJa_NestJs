import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { Users } from 'src/entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcrypt";

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(userId:number, email: string) {
    const result = await this.usersService.findEmail(userId, email);
    if (!result) {
      throw new ForbiddenException('존재하지 않는 사용자입니다');
    }
    const temporaryCode = await this.generateTemporaryCode();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    try {
      await this.mailerService.sendMail({
        to: result.email,
        subject: 'lgoChaja 인증코드',
        html: `<p>lgoChaja에서 인증코드: <strong>${temporaryCode}</strong>드립니다.</p>`,
      });
      await this.usersRepository.update(
        { id: userId, email: result.email },
        { verificationCode: temporaryCode, expirationTime: expirationTime },
      );
      return { data: '인증코드를 전송했습니다.' };
    } catch{
      throw new NotFoundException('이메일 전송 중 오류가 발생했습니다.');
    }
  }

  async generateTemporaryCode() {
    const temporaryCode = randomBytes(3).toString('hex').toUpperCase();
    return temporaryCode;
  }

  async verifyEmailCode(userId:number, verificationCode: string, email: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId, email, verificationCode },
      select: ['email', 'expirationTime']
    });
    if (user && user.expirationTime > new Date()) {
      return { data: user.email };
    } else {
      return { data: '유효한 코드가 아닙니다.' };
    }
  }
  
  async sendPasswordResetEmail(social:string, email: string){
    const result = await this.usersService.findSocialEmail(social, email);
    if (!result) {
      throw new ForbiddenException('존재하지 않는 사용자입니다');
    }
    const temporaryCode = await this.generateTemporaryCode();
    const hashedPassword = await bcrypt.hash(temporaryCode,  parseInt(process.env.HASHSALT)); // 임시 비밀번호를 해싱하여 저장

    try {
      await this.usersRepository.update(
        { id: result.id, email: result.email, social: result.social},
        { password: hashedPassword},
      );

      await this.mailerService.sendMail({
        to: result.email,
        subject: 'lgoChaja 임시 패스워드',
        html: `<p>lgoChaja에서 새로운 패스워드: <strong>${temporaryCode}</strong>드립니다.</p>`,
      });

      return { data: '임시 비밀번호를 전송했습니다.' };
    } catch {
      throw new NotFoundException('이메일 전송 중 오류가 발생했습니다.');
    }
  }
}
