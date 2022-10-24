import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from './db/order.repository';
import { Order } from './db/orders.entity';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Injectable()
export class OrdersDataService {
  constructor(
    private orderRepository: OrderRepository,
    private connection: Connection,
  ) {}
  private orders: Array<Order> = [];

  async addOrder(order: CreateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToSave = new Order();

      orderToSave.id = uuidv4();
      orderToSave.description = order.description;
      orderToSave.orderItems = [];

      return await manager.save(orderToSave);
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.orderRepository.delete(id);
  }

  async updateOrder(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await this.getOrderById(id);

      orderToUpdate.description = order.description;

      return await manager.save(orderToUpdate);
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async addProductToOrder(id: string, order: CreateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await this.orderRepository.findOneBy({ id });

      orderToUpdate.description = order.description;

      return await manager.save(orderToUpdate);
    });
  }

  async deleteProductFromOrder(
    id: string,
    order: UpdateOrderDTO,
  ): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await this.orderRepository.findOneBy({ id });

      orderToUpdate.description = order.description;

      return await manager.save(orderToUpdate);
    });
  }

  async updateUserAddress(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await this.orderRepository.findOneBy({ id });

      orderToUpdate.description = order.description;

      return await manager.save(orderToUpdate);
    });
  }
}
