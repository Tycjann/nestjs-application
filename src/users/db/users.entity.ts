import { Roles } from 'src/shared/enums/Roles.enum';
import { UserAddress } from './user-address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nameFirst: string;

  @Column({ length: 50 })
  nameLast: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'date' })
  dateBirth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  // @OneToMany((type) => UserAddress, (address) => address.user)
  @OneToMany(() => UserAddress, (address) => address.user)
  address?: UserAddress[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
