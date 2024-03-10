import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth.service';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }
  
  serializeUser(user: any, done: CallableFunction) {
    console.log(user)
    done(null, user.emali);
  }

  async deserializeUser(userId: any, done: CallableFunction) {
    console.log(userId);
    return await this.usersRepository
    .findOneOrFail({
      where: { id: +userId },
      select: ['id', 'email', 'nickname'],
      relations: [],
    })
    .then((user) => {
      console.log("kakao",user);
      done(null, user);
    })
    .catch((error) => done(error));
  }
}

