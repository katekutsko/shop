import { NgModule } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
  declarations: [
    CartRoutingModule.components,
    CartItemComponent,
    CartListComponent,
  ],
  imports: [SharedModule, CartRoutingModule],
})
export class CartModule {}
