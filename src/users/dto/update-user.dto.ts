import { Roles } from 'src/enums/Roles.enum';
import { CreateUserAddressDTO } from './create-user-address';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested, IsEnum } from 'class-validator';
import arrayToDate from '../../utils/arrayToDate';

export class UpdateUserDTO {
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
  address?: Array<CreateUserAddressDTO>;

  @IsEnum(Roles)
  role: Roles;
}
