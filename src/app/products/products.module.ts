import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './components/first/first.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [FirstComponent, ProductComponent, ProductListComponent],
  imports: [CommonModule],
  exports: [FirstComponent],
})
export class ProductsModule {}
