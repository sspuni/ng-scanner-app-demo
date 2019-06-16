import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private httpClient: HttpClient) {}
  getProductInfo(productSKU): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('/assets/products.json').subscribe(
        (products: [Product]) => {
          const product: Product = products.find(
            (value: Product): boolean => {
              return value.sku === productSKU;
            }
          );
          if(product){
            return resolve(product);
          }
          reject('not_found');
        },
        (error: Error) => {
          reject(error);
        }
      );
    });
  }
}
