import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MembersService } from 'src/members/members.service';
import { MembersRepository } from 'src/members/members.repository';

@Module({
  providers: [AuthService, MembersService, MembersRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
