import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';


const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'product/:type', component : ProductListComponent},
{path: 'product-detail/:id', component : ProductDetailsComponent},
{path: 'mycart', component : ProductCartComponent},
{path: 'checkout', component : ProductCheckoutComponent},
{ path: '',  redirectTo: '/products', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
