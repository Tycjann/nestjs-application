import { Tags } from 'src/shared/enums/Tags.enum';
import {
  IsNotEmpty,
  IsEnum,
  IsArray,
  Min,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  count: number;

  @IsArray()
  @IsEnum(Tags)
  tags: Tags[];
}
