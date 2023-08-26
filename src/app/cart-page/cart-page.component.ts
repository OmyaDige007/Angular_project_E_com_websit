import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {

    this.loadDetails()
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
      // let user = localStorage.getItem('user');
      // let userId = user && JSON.parse(user).id
      // this.product.getCartList(userId);

      this.loadDetails();
    })
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;

      result.forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * + items?.quantity)
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 15;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 15) + 100 - (price / 10);
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    })
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }
}