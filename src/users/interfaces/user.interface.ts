import { Roles } from 'src/shared/enums/Roles.enum';
import { UserAddress } from './user-address.interface';

export interface User {
  id: string;
  nameFirst: string;
  nameLast: string;
  email: string;
  dateBirth: Date;
  address?: UserAddress[];
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}
