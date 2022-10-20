import { Injectable } from '@nestjs/common';
import { User } from './db/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/user-address.repository';
import { CreateUserAddressDTO } from './dto/create-user-address';
import { UserAddress } from './db/user-address.entity';
import { UpdateUserAddressDTO } from './dto/update-user-address';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class UsersDataService {
  constructor(
    private repository: UserRepository,
    private repositoryUserAddress: UserAddressRepository,
    private connection: Connection,
  ) {}

  private users: User[] = [];

  async getUserById(id: string): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email: email });
  }

  getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
    userAddressRepository: UserAddressRepository,
  ): Promise<UserAddress[]> {
    const addressToSave: UserAddress[] = [];
    for (const add of address) {
      const userAddress = new UserAddress();

      userAddress.country = add.country;
      userAddress.city = add.city;
      userAddress.street = add.street;
      userAddress.houseNumber = add.houseNumber;
      userAddress.apartmentNumber = add.apartmentNumber;

      addressToSave.push(await userAddressRepository.save(userAddress));
    }

    return addressToSave;
  }

  async addUser(item: CreateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.nameFirst = item.nameFirst;
      userToSave.nameLast = item.nameLast;
      userToSave.email = item.email;
      userToSave.role = item.role;
      userToSave.dateBirth = item.dateBirth;

      userToSave.address = await this.prepareUserAddressesToSave(
        item.address,
        manager.getCustomRepository(UserAddressRepository),
      );
      // userToSave.address = await this.prepareUserAddressesToSave(item.address);
      return await manager.getCustomRepository(UserRepository).save(userToSave);
    });
  }

  async updateUser(id: string, item: UpdateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      // ? dobrze?
      this.repositoryUserAddress.deleteUserAddressesByUserId(id);
      const userToUpdate = await this.getUserById(id);

      userToUpdate.nameFirst = item.nameFirst;
      userToUpdate.nameLast = item.nameLast;
      userToUpdate.email = item.email;
      userToUpdate.address = await this.prepareUserAddressesToSave(
        item.address,
        manager.getCustomRepository(UserAddressRepository),
      );
      userToUpdate.role = item.role;
      userToUpdate.dateBirth = item.dateBirth;

      await this.repository.save(userToUpdate);

      return this.getUserById(id);
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
