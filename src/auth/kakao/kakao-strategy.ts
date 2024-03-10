import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENT_SECRT,
      callbackURL: process.env.CALL_BACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: CallableFunction) {
    const { provider, username} = profile;
    const { profile_image } = profile._json.properties;
    const { email } = profile._json.kakao_account;
    const result = await this.authService.socialUser(email, username, profile_image, provider)
    done(null, result);
  }
}
