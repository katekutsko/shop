import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsRoutingModule.components, ProductComponent],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
