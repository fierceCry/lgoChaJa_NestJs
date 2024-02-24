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

  async findByEamil(email: string){
    return this.usersRepository.findOne({
      where : {email},
      select : ["id", "email", "password"]
    })
  }

  async getUser(){

  }

  async signUp(email: string, nickname: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ 
      where: { email } 
    });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASHSALT));
  
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    return 'ok';
  }
}
