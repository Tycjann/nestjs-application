import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Statuses } from 'src/shared/enums/Statuses.enum';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @IsNotEmpty()
  orderItems: Array<UpdateOrderProductDTO>;
  @IsNotEmpty()
  @IsUUID()
  userAddressId: string;
  @IsNotEmpty()
  status: Statuses[];
}
export class UpdateOrderProductDTO {
  @IsNotEmpty()
  productId: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
