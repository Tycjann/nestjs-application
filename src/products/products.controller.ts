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
import { Product } from './db/products.entity';
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
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id),
    );
  }

  @Get()
  async getAllProducts(): Promise<ExternalProductDTO[]> {
    const allProducts = this.productRepository.getAllProducts();

    return (await allProducts).map((product) =>
      this.mapProductToExternal(product),
    );
  }

  @Post()
  @UseGuards(RoleGuard)
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.addProduct(item),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.updateProduct(id, item),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      // ? Czy ja muszę konwertować daty?
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.productRepository.deleteProduct(id);
  }
}
