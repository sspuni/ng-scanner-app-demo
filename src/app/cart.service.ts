import { Injectable } from '@angular/core';
import { Product } from './product';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Array<CartItem> = [];

  constructor() {}

  add(product: Product) {
    const existingItem = this.items.find(
      (item: CartItem): boolean => {
        return product.sku === item.product.sku;
      }
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        quantity: 1,
        product
      };
      this.items.push(cartItem);
    }
  }

  remove(product: Product, quantity: number = 1) {
    const index = this.items.findIndex(
      (item: CartItem): boolean => {
        return item.product.sku === product.sku;
      }
    );
    if (index >= 0) {
      const item = this.items[index];
      if (item.quantity - quantity <= 0) {
        // remove this product all together
        this.items.splice(index, 1);
      } else {
        item.quantity -= quantity;
      }
    }
  }

  getItems() {
    return this.items;
  }

  private _roundNumber(value: number, places: number = 2) {
    const precision = Math.pow(10, places);
    return Math.round(value * precision) / precision;
  }

  getShippingCost(){
    return this._roundNumber(this.items.length ? 10 : 0);
  }

  getItemSubTotal() {
    return this._roundNumber(this.items.reduce((acc, item): number => {
      return acc + (item.product.price * item.quantity);
    }, 0));
  }

  getTax(){
    return this._roundNumber(this.getItemSubTotal()*0.18);
  }

  getTotalAmount() {
    return this._roundNumber(this.getShippingCost() + this.getItemSubTotal() + this.getTax());
  }

  checkout() {
    this.items = [];
  }
}
