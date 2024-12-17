import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';

@Module({
  providers: [MembersService, MembersRepository],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
