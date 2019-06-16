import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Product } from '../product';
import { BarcodeFormat } from '@zxing/library';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  public allowedFormats: Array<BarcodeFormat> = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX
  ];

  public productLoaded: Boolean;
  public scannedProduct: Product;
  public hasResult: Boolean;
  public hasError: Boolean;
  public message: String;
  public addedToCart: Boolean;
  constructor(private inventory: InventoryService, private cart: CartService) {}

  ngOnInit() {
    this.reset();
  }

  onScan(type, event) {
    if (type === 'success') {
      this.hasResult = true;
      this.inventory
        .getProductInfo(event)
        .then((product: Product) => {
          this.productLoaded = true;
          this.scannedProduct = product;
          this.message = `Scanned successfuly`;
        })
        .catch(error => {
          this.hasError = true;
          if (error === 'not_found') {
            this.message = 'No such product exists in our inventory';
          } else {
            this.message = `Error: ${error.message || error}`;
          }
        });
    }
  }

  reset() {
    this.hasResult = this.hasError = this.productLoaded = false;
    this.addedToCart = false;
    this.scannedProduct = null;
    this.message = '';
  }

  addToCart(button) {
    this.cart.add(this.scannedProduct);
    this.message = 'Product added to cart!';
    this.addedToCart = true;
  }
}
