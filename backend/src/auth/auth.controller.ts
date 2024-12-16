import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao/callback')
  kakaoCallback(@Query() query: { code: string }) {
    return this.authService.kakaoCallback({ code: query.code });
  }

  @Get('/kakao')
  @Redirect()
  kakao() {
    const uri = this.authService.kakaoGetAuthorize();
    return {
      uri,
      statusCode: 301,
    };
  }
}
