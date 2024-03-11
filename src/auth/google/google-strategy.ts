import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
      scope: [process.env.GOOGLE_EMAIL, process.env.GOOGLE_PROFILE],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { displayName, emails, photos, provider } = profile;
    console.log(profile);
    const user = {
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      accessToken
    };
    const result = await this.authService.socialUser(user.email, user.name, user.picture, provider);
    done(null, result);
  }
}
