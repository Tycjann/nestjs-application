import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { TagRepository } from './db/tags.repository';
import { ProductRepository } from './db/products.repository';
import { Tags } from './db/tags.entity';
import { Product } from './db/products.entity';

@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
  ) {}

  private products: Product[] = [];

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async addProduct(item: CreateProductDTO): Promise<Product> {
    const tags: Tags[] = await this.tagRepository.findTagsByName(item.tags);
    const productToSave = new Product();
    productToSave.name = item.name;
    productToSave.price = item.price;
    productToSave.count = item.count;
    productToSave.tags = tags;
    return this.productRepository.save(productToSave);
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDTO): Promise<Product> {
    const tags: Tags[] = await this.tagRepository.findTagsByName(item.tags);
    const productToUpdate = await this.getProductById(id);

    productToUpdate.name = item.name;
    productToUpdate.price = item.price;
    productToUpdate.count = item.count;
    productToUpdate.tags = tags;

    await this.productRepository.save(productToUpdate);

    return this.getProductById(id);
  }
}
