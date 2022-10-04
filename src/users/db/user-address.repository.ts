import { EntityRepository, Repository } from 'typeorm';
import { UserAddress } from './user-address.entity';

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
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
