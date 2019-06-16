import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public items: Array<CartItem> = [];
  public tax: number = 0;
  public subtotal: number = 0;
  public shipping: number = 0;
  public total: number = 0;
  constructor(private cart: CartService) { }

  ngOnInit() {
    this.items = this.cart.getItems();
    this.tax = this.cart.getTax();
    this.subtotal = this.cart.getItemSubTotal();
    this.shipping = this.cart.getShippingCost();
    this.total = this.cart.getTotalAmount();
    this.cart.checkout();
  }

  

}
