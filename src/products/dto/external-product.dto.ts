import { Tags } from 'src/shared/enums/Tags.enum';

export interface ExternalProductDTO {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tags[];
  createdAt: number[];
  updatedAt: number[];
}
