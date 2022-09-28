import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { v4 as uuidv4 } from 'uuid';
import dateToArray from 'src/utils/dateToArray';

@Injectable()
export class ProductsDataService {
  private products: Product[] = [];

  getProductById(id: string): Product {
    return this.products.find((product) => product.id === id);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  addProduct(item: CreateProductDTO): ExternalProductDTO {
    // item.id = uuidv4();
    // item.createdAt = new Date();
    // item.updatedAt = new Date();
    // item.products.push(item);
    // return item;
    const product: Product = {
      ...item,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  updateProduct(id: string, item: ExternalProductDTO): Product {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return {
          ...item,
          id: product.id,
          createdAt: product.createdAt,
          updatedAt: new Date(),
        };
      }
      return product;
    });

    return this.getProductById(id);
  }
}
