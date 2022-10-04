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
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './products/db/tags.repository';

// import config from './ormconfig';
import config = require('./ormconfig');

import * as cors from 'cors';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forRoot(config as DataSourceOptions),
    TypeOrmModule.forFeature([TagRepository]),
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
