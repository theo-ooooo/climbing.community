import { IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  provider: string;

  @IsString()
  code?: string;
}
