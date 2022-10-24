import { Statuses } from 'src/shared/enums/Statuses.enum';
import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/user-address.entity';
import { OrderProducts } from '../db/orderProducts.entity';

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderProducts[];
  user: User;
  address: UserAddress;
  price: number;
  description: string;
  status: Array<Statuses>;
}
