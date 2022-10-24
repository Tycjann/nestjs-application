import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Order } from './db/orders.entity';
import { OrdersDataService } from './orders-data.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ExternalOrderDTO } from './dto/external-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import dateToArray from 'src/shared/utils/dateToArray';

@Controller('orders')
export class OrdersController {
  constructor(private orderRepository: OrdersDataService) {}

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDTO> {
    return this.mapOrderToExternal(await this.orderRepository.getOrderById(id));
  }

  @Get()
  async getAllOrders(): Promise<ExternalOrderDTO[]> {
    const allOrders = await this.orderRepository.getAllOrders();
    return allOrders.map((order) => this.mapOrderToExternal(order));
  }

  @Post()
  async addOrder(@Body() _item_: CreateOrderDTO): Promise<ExternalOrderDTO> {
    const order = await this.orderRepository.addOrder(_item_);
    return this.mapOrderToExternal(order);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOrder(@Param('id') _id_: string): Promise<void> {
    await this.orderRepository.deleteOrder(_id_);
    return null;
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateOrderDTO,
  ): Promise<ExternalOrderDTO> {
    const order = await this.orderRepository.updateOrder(id, dto);
    return this.mapOrderToExternal(order);
  }

  mapOrderToExternal(order: Order): ExternalOrderDTO {
    return {
      ...order,
      createdAt: dateToArray(order.createdAt),
      updatedAt: dateToArray(order.updatedAt),
    };
  }
}
