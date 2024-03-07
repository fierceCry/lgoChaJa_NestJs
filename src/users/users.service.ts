import { Catch, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt";

@Injectable()
@Catch(HttpException)
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository : Repository<Users>
  ){}

  async getUser(userId : number){
    return this.usersRepository.findOne({
      where : { id: userId },
      select : ['id', 'email', 'explain', 'image']
    })
  }

  async signUp(email: string, nickname: string, password: string, social: string){
    const user = await this.usersRepository.findOne({ 
      where: {     
        email: email
      } 
    });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASHSALT));
  
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
      social
    });
    return 'ok';
  }
}
