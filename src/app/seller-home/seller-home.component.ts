import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { OnInit } from '@angular/core';
import { product } from '../data-type';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList:undefined| product[];
  productMessage:undefined|string;
icon=faTrash;
iditIcon=faEdit;

  constructor(private product:ProductService){}
  

  ngOnInit(): void {
    // this.product.productList().subscribe((result)=>{
    //   console.warn(result)
    //   if(result){
    //     this.productList=result;
    //   }
    // })
    this.list();
  }

deleteProduct(id:number){
  console.warn("test id",id)

  this.product.deleteProduct(id).subscribe((result)=>{
if(result){
  this.productMessage="Product is deleted";
  this.list();
}
  })

  setTimeout(() => {
    this.productMessage=undefined
  }, 5000);
}

list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result)
    if(result){
      this.productList=result;
    }
  })
}
}


