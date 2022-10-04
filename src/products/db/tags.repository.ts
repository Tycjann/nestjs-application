import { EntityRepository, Repository, In } from 'typeorm';
import { Tags } from './tags.entity';

@EntityRepository(Tags)
export class TagRepository extends Repository<Tags> {
  findTagsByName(names: string[]): Promise<Tags[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
