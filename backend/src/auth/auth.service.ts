import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  kakaoAuth() {
    const clientId = this.configService.get<string>('auth.kakao.clientId');
    const redirectUri = this.configService.get<string>(
      'auth.kakao.redirectUri',
    );

    console.log(clientId, redirectUri);

    return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }
}
