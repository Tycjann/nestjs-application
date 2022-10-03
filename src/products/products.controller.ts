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
  UseGuards,
} from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';
import dateToArray from 'src/shared/utils/dateToArray';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalProductDTO {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Get()
  getAllProducts(): ExternalProductDTO[] {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }

  @Post()
  @UseGuards(RoleGuard)
  addProduct(@Body() item: CreateProductDTO): ExternalProductDTO {
    return this.mapProductToExternal(this.productRepository.addProduct(item));
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateProductDTO,
  ): ExternalProductDTO {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, item),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.productRepository.deleteProduct(id);
  }
}
