import { Injectable } from '@nestjs/common';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {}

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // exampleQueryBuilder() {
  //   return this.dataSource.getRepository(User).createQueryBuilder();
  // }
}
