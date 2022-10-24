import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OrderedProducts } from './orderProducts.entity';

@Injectable()
export class OrderedProductRepository extends Repository<OrderedProducts> {
  constructor(private dataSource: DataSource) {
    super(OrderedProducts, dataSource.createEntityManager());
  }
  public async deleteProductOrderByOrderId(orderId: string): Promise<void> {
    const OrderedProducts = await this.find({
      where: {
        id: orderId,
      },
    });

    await this.remove(OrderedProducts);
  }
}
