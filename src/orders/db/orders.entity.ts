import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderedProducts } from './orderProducts.entity';
import { User } from '../../users/db/users.entity';
import { Statuses } from 'src/shared/enums/Statuses.enum';
import { UserAddress } from 'src/users/interfaces/user-address.interface';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    (type) => OrderedProducts,
    (orderedProducts) => orderedProducts.orderId,
  )
  @JoinTable({
    name: 'orderedProducts',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'productId',
    },
  })
  orderItems: OrderedProducts[];

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinTable({
    name: 'state',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'stateId',
    },
  })
  state: Statuses[];

  @JoinTable({
    name: 'orderedAddresses',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'addressId',
    },
  })
  address: UserAddress[];

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
