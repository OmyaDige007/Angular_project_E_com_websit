import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;

      result.forEach((items) => {
        if (items.quantity) {
          price = price + (+items.price * + items?.quantity)
        }

      });
      this.totalPrice = price + (price / 15) + 100 - (price / 10);
    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((items) => {
        setTimeout(() => {
          items.id && this.product.deleteCartItems(items.id)
        }, 800);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your order has been placed";
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg = undefined;
          }, 4000);

        }
      })
    }

  }

}