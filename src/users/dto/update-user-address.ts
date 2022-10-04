import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserAddressDTO {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  houseNumber: number;

  @IsNotEmpty()
  @IsNumber()
  apartmentNumber?: number;
}
