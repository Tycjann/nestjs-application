import { Roles } from 'src/shared/enums/Roles.enum';
import { UserAddress } from '../interfaces/user-address.interface';

export interface ExternalUserDTO {
  id: string;
  nameFirst: string;
  nameLast: string;
  email: string;
  dateBirth: number[];
  address?: UserAddress[];
  role: Roles;
  createdAt: number[];
  updatedAt: number[];
}
