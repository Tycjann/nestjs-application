/* eslint-disable @typescript-eslint/no-unused-vars */
import { Roles } from 'src/enums/Roles.enum';
import { CreateUserAddressDTO } from './create-user-address';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested, IsEnum } from 'class-validator';
import arrayToDate from '../../shared/utils/arrayToDate';

export class CreateUserDTO {
  @IsNotEmpty()
  nameFirst: string;

  @IsNotEmpty()
  nameLast: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @Transform((d) => arrayToDate(d))
  dateBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDTO)
  address?: CreateUserAddressDTO[];

  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;
}
