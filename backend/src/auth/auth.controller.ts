import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao/callback')
  kakaoCallback(@Query() query: { code: string }) {
    console.log('query', query.code);
  }

  @Get('/kakao')
  @Redirect()
  kakao() {
    const url = this.authService.kakaoAuth();
    return {
      url,
      statusCode: 301,
    };
  }
}
