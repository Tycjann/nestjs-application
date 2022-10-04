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
import dateToArray from 'src/shared/utils/dateToArray';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  userEmailValidator = new UserValidatorService(this.userRepository);

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.getUserById(id));
  }

  @Get()
  async getAllUsers(): Promise<ExternalUserDTO[]> {
    const allUser = await this.userRepository.getAllUsers();
    return allUser.map((user) => this.mapUserToExternal(user));
  }

  @Post()
  async addUser(@Body() item: CreateUserDTO): Promise<ExternalUserDTO> {
    this.userEmailValidator.validateUniqueEmail(item.email);
    return this.mapUserToExternal(await this.userRepository.addUser(item));
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateUserDTO,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(id, item),
    );
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
      // ? Czy ja muszę konwertować daty?
      dateBirth: dateToArray(user.dateBirth),
      createdAt: dateToArray(user.createdAt),
      updatedAt: dateToArray(user.updatedAt),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.userRepository.deleteUser(id);
  }
}
