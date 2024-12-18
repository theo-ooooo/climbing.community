import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  @ApiProperty({ description: '소셜 종류' })
  provider: string;

  @IsString()
  @ApiProperty({ description: '카카오에서 발급한 코드' })
  code?: string;
}
