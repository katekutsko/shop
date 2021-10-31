import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState, ProductsFacadeService, RouterActions } from '../../core';
import { ProductModel } from '../../products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productsFacade: ProductsFacadeService,
    private store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProductModel | Observable<ProductModel> | Promise<ProductModel> {
    return this.productsFacade.productByUrl$.pipe(
      take(1),
      tap((product: ProductModel) => {
        if (!product) {
          this.store.dispatch(
            RouterActions.go({ path: ['/admin/products-list'] })
          );
        }
      })
    );
  }
}
