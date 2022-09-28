import { Tags } from 'src/enums/Tags.enum';

export interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tags[];
  createdAt: Date;
  updatedAt: Date;
}
