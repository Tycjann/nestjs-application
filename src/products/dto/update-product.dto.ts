import { Tags } from 'src/enums/Tags.enum';

export interface UpdateProductDTO {
  name: string;
  price: number;
  count: number;
  tags: Tags[];
}
