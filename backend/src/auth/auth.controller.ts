import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Provider } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/social-login')
  socialLogin(@Body() body: { code: string; provider: string }) {
    if (body.provider === Provider.KAKAO) {
      return this.authService.kakaoCallback({ code: body.code });
    }
    new HttpException('NOT FOUND PROVIDER', HttpStatus.NOT_FOUND);
  }

  // @Get('/kakao')
  // kakao(@Res() res: Response) {
  //   const uri = this.authService.kakaoGetAuthorize();
  //   console.log(uri);
  //   res.redirect(301, uri);
  // }
}
