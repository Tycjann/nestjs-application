import { Roles } from 'src/enums/Roles.enum';
import { UserAddress } from '../interfaces/user-address.interface';

export interface CreateUserDTO {
  nameFirst: string;
  nameLast: string;
  email: string;
  dateBirth?: Date;
  address: UserAddress[];
  role: Roles;
}
