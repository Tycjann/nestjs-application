import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { TagRepository } from './db/tags.repository';
import { ProductRepository } from './db/products.repository';
import { Tags } from './db/tags.entity';
import { Product } from './db/products.entity';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private connection: Connection,
  ) {}

  private products: Product[] = [];

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async addProduct(item: CreateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tags[] = await this.tagRepository.findTagsByName(item.tags);
      const productToSave = new Product();
      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.count = item.count;
      productToSave.tags = tags;
      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tags[] = await this.tagRepository.findTagsByName(item.tags);
      const productToUpdate = await this.getProductById(id);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.count = item.count;
      productToUpdate.tags = tags;

      await manager
        .getCustomRepository(ProductRepository)
        .save(productToUpdate);

      return this.getProductById(id);
    });
  }
}
