import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { ProductRepository } from './db/products.repository';
import { TagRepository } from './db/tags.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsDataService, ProductRepository, TagRepository],
})
export class ProductsModule {}
