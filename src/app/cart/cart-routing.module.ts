import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartStatePreloadingGuard } from '../shared';
import { CartComponent } from './cart.component';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { IsCartNonEmptyGuard } from './guards';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [CartStatePreloadingGuard],
    component: CartComponent,
  },
  {
    path: 'order',
    canActivate: [IsCartNonEmptyGuard],
    component: ProcessOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {
  static components = [CartComponent, ProcessOrderComponent];
}
