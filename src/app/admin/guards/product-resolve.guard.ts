import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ProductModel } from 'src/app/products/models/product.model';
import { AdminProductsService } from '../services/admin-products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private readonly productsService: AdminProductsService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProductModel | Observable<ProductModel> | Promise<ProductModel> {
    if (!route.paramMap.has('productID')) {
      return of({
        name: '',
        description: '',
        price: null,
        category: null,
        isAvailable: null,
      });
    }
    const id: string = route.paramMap.get('productID');

    return this.productsService.getProductById(id).pipe(
      switchMap((product: ProductModel) => {
        if (product) {
          return of(product);
        } else {
          this.router.navigate(['/admin/products-list']);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/admin/products-list']);
        return EMPTY;
      })
    );
  }
}
