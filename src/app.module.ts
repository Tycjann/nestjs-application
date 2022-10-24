import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './products/db/tags.repository';
import { AppDataSource } from './ormconfig';
import { OrdersModule } from './orders/orders.module';

import * as cors from 'cors';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([TagRepository]),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    // .forRoutes(ProductsController) // only for controller ProductsController
  }
}
