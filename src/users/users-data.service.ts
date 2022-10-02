import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: User[] = [];

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  getAllUsers(): User[] {
    return this.users;
  }
  addUser(item: CreateUserDTO): User {
    const user: User = {
      ...item,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(id: string, item: UpdateUserDTO): User {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...item,
          id: user.id,
          createdAt: user.createdAt,
          dateBirth: user.dateBirth,
          updatedAt: new Date(),
        };
      }
      return user;
    });

    return this.getUserById(id);
  }
}
