import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Array<CartItem> = [];
  constructor(private cart: CartService, private router: Router) { }

  ngOnInit() {
    this.items = this.cart.getItems();
  }

  incItemQty(item) {
    this.cart.add(item.product);
  }

  decItemQty(item) {
    if(item.quantity <= 1){
      return this.deleteItem(item);
    }
    this.cart.remove(item.product, 1);
  }

  deleteItem(item: CartItem){
    if(confirm("Are you sure that you want to remove this item from cart?")){
      this.cart.remove(item.product, item.quantity);
    }
  }


  getShippingCost(){
    return this.cart.getShippingCost();
  }

  getItemSubTotal() {
    return this.cart.getItemSubTotal();
  }

  getTax(){
    return this.cart.getTax();
  }

  getTotalAmount() {
    return this.cart.getTotalAmount();
  }

  checkout() {
    this.router.navigate(["/checkout"]);
  }
}
