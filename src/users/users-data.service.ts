import { Injectable } from '@nestjs/common';
import { User } from './db/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './db/users.repository';
import { UserAddressRepository } from './db/user-address.repository';
import { CreateUserAddressDTO } from './dto/create-user-address';
import { UserAddress } from './db/user-address.entity';
import { UpdateUserAddressDTO } from './dto/update-user-address';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  private users: User[] = [];

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.houseNumber = add.houseNumber;
      addressToSave.apartmentNumber = add.apartmentNumber;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }

  async addUser(item: CreateUserDTO): Promise<User> {
    const userToSave = new User();

    userToSave.nameFirst = item.nameFirst;
    userToSave.nameLast = item.nameLast;
    userToSave.email = item.email;
    userToSave.address = await this.prepareUserAddressesToSave(item.address);
    userToSave.role = item.role;
    userToSave.dateBirth = item.dateBirth;

    return this.userRepository.save(userToSave);
  }

  async updateUser(id: string, item: UpdateUserDTO): Promise<User> {
    // ? dobrze?
    this.userAddressRepository.deleteUserAddressesByUserId(id);

    const userToUpdate = await this.getUserById(id);

    userToUpdate.nameFirst = item.nameFirst;
    userToUpdate.nameLast = item.nameLast;
    userToUpdate.email = item.email;
    userToUpdate.address = await this.prepareUserAddressesToSave(item.address);
    userToUpdate.role = item.role;
    userToUpdate.dateBirth = item.dateBirth;

    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}
