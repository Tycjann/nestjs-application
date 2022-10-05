import { Injectable } from '@nestjs/common';
import { DataSource, Repository, In } from 'typeorm';
import { Tags } from './tags.entity';

@Injectable()
export class TagRepository extends Repository<Tags> {
  constructor(private dataSource: DataSource) {
    super(Tags, dataSource.createEntityManager());
  }
  findTagsByName(names: string[]): Promise<Tags[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
