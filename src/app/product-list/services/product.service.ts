import { Injectable } from '@angular/core';
import { ApplicationConstants } from '../../constants/application-constants';
import { RestService } from '../../core-services/rest.service';
import { IProducts, ICartProduct } from '../../models/product';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productList : IProducts;
  public cartItemCount  = new BehaviorSubject(0);
  public displayCartCount : number;

  constructor(private productListService: RestService<IProducts>, private addProductToCartService: RestService<ICartProduct>,
    private cartListService: RestService<ICartProduct>) { 
      
  }

  public  getProductList(productId : string = ''): Observable<IProducts> {
        return  this.productListService.getData(ApplicationConstants.basePath, ApplicationConstants.ProductsPageurl,
      ApplicationConstants.productListContentTYpe , productId);
    
  }

  public addProductItem(productData: IProducts): Observable<IProducts>{
    return  this.productListService.postData(productData, ApplicationConstants.basePath, ApplicationConstants.ProductsPageurl,
      ApplicationConstants.productListContentTYpe,  ApplicationConstants.productListContentTYpe);
  }

  public addProductItemToCart(cartItemData: ICartProduct): Observable<ICartProduct>{
    return  this.addProductToCartService.postData(cartItemData, ApplicationConstants.basePath, ApplicationConstants.CartPageurl,
      ApplicationConstants.productListContentTYpe,  ApplicationConstants.productListContentTYpe);
  }

  public  getCartList(productId : string = ''): Observable<ICartProduct> {
    return  this.cartListService.getData(ApplicationConstants.basePath, ApplicationConstants.CartPageurl,
  ApplicationConstants.productListContentTYpe , productId);

}
public deleteCartItem(id : string): Observable<ICartProduct> {
  return  this.cartListService.deleteData(id, ApplicationConstants.basePath, ApplicationConstants.CartPageurl,
    ApplicationConstants.productListContentTYpe,  ApplicationConstants.productListContentTYpe);
}


  public getDateWithTime(): string{
      var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  return dateTime;
  }
}
