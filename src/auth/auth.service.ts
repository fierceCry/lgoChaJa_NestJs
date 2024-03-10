import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) 
    private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    console.log(email, password, user);
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async socialUser(email:string, username: string, profile_image:string, provider: string){
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'social'],
    });
    if (!user) {
      const user = this.usersRepository.create({
        email,
        nickname: username,
        image: profile_image,
        social: provider
      });
      await this.usersRepository.save(user);
    }
    return user;
  }
}
