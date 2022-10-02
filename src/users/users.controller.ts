import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersDataService } from './users-data.service';
import dateToArray from 'src/utils/dateToArray';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  userEmailValidator = new UserValidatorService(this.userRepository);

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get()
  getAllUsers(): ExternalUserDTO[] {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Post()
  addUser(@Body() item: CreateUserDTO): ExternalUserDTO {
    this.userEmailValidator.validateUniqueEmail(item.email);

    return this.mapUserToExternal(this.userRepository.addUser(item));
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, item));
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
      dateBirth: dateToArray(user.dateBirth),
      createdAt: dateToArray(user.createdAt),
      updatedAt: dateToArray(user.updatedAt),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.userRepository.deleteUser(id);
  }
}
