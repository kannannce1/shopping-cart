import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-list/services/product.service';
import { ICartProduct, IProducts } from '../models/product';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../constants/application-constants';



@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  public cartItems: ICartProduct;
  public orderSubTotal: number;
  public shippingPrice: number = 10;
  public cartOrderTotal:  number;
  public productItemData : IProducts;


  constructor(private productService : ProductService, private router: Router) {

   }

  ngOnInit() {
    // calling method used to get the cart items
    this.getCartListItems();
  }
  //  method used to get the cart items
  public getCartListItems(){
    this.productService.getCartList().subscribe((data) =>{
     this.cartItems = data;
     this.getOrderSubTotal(data);

    })
  }

// method to get the products sub total amount
  public getOrderSubTotal(cart : ICartProduct): void {
    let total = 0;
  
    for (let i = 0; i < Object.keys(cart).length; i++) {

       total += Number(cart[i].productTotalPrice);
   
  }
  this. orderSubTotal = total;

  this.cartOrderTotal =  this.shippingPrice + this.orderSubTotal;
 

  }

  // to delete the item from the cart

  public deleteCartItem(id: number){

    const idString = id.toString();
    
    if(confirm(ApplicationConstants.alertTextConstant)){
       this.productService.deleteCartItem(idString).subscribe((data) => {
        
         this.productService.cartItemCount.next(this.productService.displayCartCount -1);
          this.router.navigateByUrl('/products');
       }),
       err => ({}),
       () => { }
    }
  }

  // to add items to the cart
  public addCartItemIncrement( index : number, updatedQty : number ):void {
     this.cartItems[index].productQtyOrder = updatedQty
     this.cartItems[index].productTotalPrice =  Number(updatedQty * this.cartItems[index].productPrice);
     this.productService.getProductList(this.cartItems[index].productId).subscribe((data =>{
      this.productItemData = data;
      
      this.cartItems[index].productTotalPrice =  Number(updatedQty * this.productItemData.productPrice);
      this.getOrderSubTotal( this.cartItems);
      
    }));


      
  }

}
