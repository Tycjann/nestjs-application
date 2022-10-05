import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserAddress } from './user-address.entity';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        // userId - wg. kursu, ale to nie działa
        // ? Czy tu ma byc na pewno id?
        id: userId,
      },
    });

    this.remove(usersAddresses);
  }
}
