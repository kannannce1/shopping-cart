import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-list/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public itemsIncart: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.getCartItemsList();

   this.productService.cartItemCount.subscribe((data) => {
      this.productService.displayCartCount = data;
    })

  }

  public getCartItemsList(){
    this.productService.getCartList().subscribe((data: any) => {
        this.productService.cartItemCount.next(data.length > 0 ? data.length : 0);
    })
  }

}
