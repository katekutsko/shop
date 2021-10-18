import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { AdminComponent } from './admin.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ProductResolveGuard } from './guards/product-resolve.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [IsAdminGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivateChild: [IsAdminGuard], // достаточно гарда выше
        children: [
          { path: 'products-list', component: ProductsListComponent },
          {
            path: 'product/add',
            component: ProductFormComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: { product: ProductResolveGuard },
          },
          {
            path: 'product/edit/:productID',
            component: ProductFormComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: { product: ProductResolveGuard },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [
    ProductFormComponent,
    ProductsListComponent,
    AdminComponent,
  ];
}
