import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { IProducts } from '../models/product';
import { ProductService } from './services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationConstants } from '../constants/application-constants';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productList : IProducts[];
  public productObjectList : any;

  public selectedproduct : IProducts;
  public productType: string;
  public highLightShirt : boolean = false;
  public highLightTShirt : boolean = false;

  constructor(private productService : ProductService, private route: ActivatedRoute) {

    
  }

  ngOnInit() {
 
     this.productService.getProductList().
     subscribe((data: IProducts)=>{
     
       this.productObjectList = Object.values(data);
       this.productList = this.productObjectList;
                      
     });

  }

  public selectedProduct(product :  IProducts){
    this.selectedproduct = product;

  }

  public  applyFilter(type: number){

    switch(type){
       case 1:
       this.productList = this.productObjectList.filter((productObjectList : IProducts) => productObjectList.productCategory == ApplicationConstants.shirtConstant);
       this.highLightShirt = true;
       this.highLightTShirt = false;
       break;
       case 2:
          this.productList = this.productObjectList.filter((productObjectList : IProducts) => productObjectList.productCategory == ApplicationConstants.tshirtConstant);
          this.highLightShirt = false;
         this.highLightTShirt = true;
          break;

       default:
          this.productList = this.productObjectList;
         
    }
   
  }

  
  

}
