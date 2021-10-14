import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsRoutingModule.components,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [SharedModule, ProductsRoutingModule],
  exports: [ProductListComponent],
})
export class ProductsModule {}
