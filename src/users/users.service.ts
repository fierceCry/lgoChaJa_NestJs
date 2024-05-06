import {
  Catch,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
@Catch(HttpException)
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUser(userId: number) {
    return this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password'],
    });
  }

  async signUp(
    email: string,
    nickname: string,
    password: string,
    social: string,
  ) {
    console.log(email)
    console.log(nickname)
    console.log(password)
    console.log(social)
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email: email,
          social: social,
        },
      });
      console.log(user)
      if (user) {
        throw new ForbiddenException('이미 존재하는 사용자입니다');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.HASHSALT),
      );

      await this.usersRepository.save({
        email,
        nickname,
        password: hashedPassword,
        social,
      });

      return '회원가입 완료했습니다.';
    } catch {
      throw new ForbiddenException('회원가입 중에 오류가 발생했습니다.');
    }
  }

  async findEmail(userId: number, email: string) {
    const result = await this.usersRepository.findOne({
      where: { id: userId, email: email },
      select: ['email'],
    });
    return result;
  }

  async findSocialEmail(social: string, email: string) {
    const result = await this.usersRepository.findOne({
      where: { email: email, social },
      select: ['id', 'email', 'social'],
    });
    return result;
  }

  async findPassword(email: string) {
    const result = await this.usersRepository.findOne({
      where: { email: email },
      select: ['email'],
    });
    return result;
  }
}
