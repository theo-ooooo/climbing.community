import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  providers: [MembersService, MembersRepository, JwtStrategy],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
