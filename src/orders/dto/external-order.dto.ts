import { User } from 'src/users/db/users.entity';
import { OrderedProducts } from '../db/orderProducts.entity';

export class ExternalOrderDTO {
  id: string;
  price: number;
  description: string;
  user?: User;
  orderItems: OrderedProducts[];
  createdAt: Array<number>;
  updatedAt: Array<number>;
  orders?: string[];
}
