import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';
import { UserAddressRepository } from './db/user-address.repository';
import { UserRepository } from './db/users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersDataService,
    UserValidatorService,
    UserRepository,
    UserAddressRepository,
  ],
})
export class UsersModule {}
