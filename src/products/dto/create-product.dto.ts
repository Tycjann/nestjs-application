import { Tags } from 'src/enums/Tags.enum';

export interface CreateProductDTO {
  name: string;
  price: number;
  count: number;
  tags: Tags[];
}
