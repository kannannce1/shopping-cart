import { Component, OnInit } from '@angular/core';
import { IProducts, ICartProduct } from '../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-list/services/product.service';
import { ApplicationConstants } from '../constants/application-constants';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private productId: string;
  public productItemData : IProducts;
  public showQualityError: boolean = false;
  public productToCart: ICartProduct;
  public highLightShirt : boolean = false;
  public highLightTShirt : boolean = false; 
 
  constructor(private route: ActivatedRoute, private productService : ProductService, private router: Router) {
     this.productId = this.route.snapshot.paramMap.get("id");
   
   }
 
   ngOnInit() {
     this.productService.getProductList(this.productId).subscribe((data =>{
       this.productItemData = data;
       this.highLightMenu(data.productCategory);
       
     }));
 
   }
 // method to add the item to the cart 
   public addToCart(productItem: IProducts, quantity: string){
 
     Number(quantity) >= 1 ?  (this.showQualityError = false, this.setProductItemTocart(productItem, Number(quantity))) : this.showQualityError = true;
    
   }

   // setting the product related data for cart
 
   public setProductItemTocart(productItem: IProducts, quantity: number){
   
    const productTocart: ICartProduct = {
      productId: productItem.id ,
      userId: 2 ,
      productQtyOrder: quantity ,
      productTotalPrice: Number(quantity * productItem.productPrice),
      productName: productItem.productName,
      productImg: productItem.productImg,
      dateOrdered :  this.productService.getDateWithTime(),
	    productDescription: productItem.productDescription

    }
     this.productService.addProductItemToCart(productTocart).subscribe((data) => {
       
      // to set the shoping cart count in the top
      const itemNext: number = this.productService.displayCartCount + 1;
       
        this.productService.cartItemCount.next(itemNext);
        this.router.navigateByUrl('/mycart');
     })
        
   
   }
   // method to highlight the left categories

   public highLightMenu(type: string): void {
    
    switch(type){
      case ApplicationConstants.shirtConstant:
        this.highLightShirt = true;
        this.highLightTShirt = false;
      break;
      case ApplicationConstants.tshirtConstant:
        this.highLightShirt = false;
        this.highLightTShirt = true;
         break;

      default:
        
   }

   }

}
