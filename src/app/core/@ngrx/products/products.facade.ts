import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../app/products/models/product.model';
import { selectProductByUrl, selectProductsData } from './products.selectors';
import { getProducts } from './products.actions';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacadeService {
  products$: Observable<readonly ProductModel[]> = this.store.pipe(
    select(selectProductsData)
  );
  productByUrl$: Observable<ProductModel> = this.store.pipe(
    select(selectProductByUrl)
  );

  constructor(private store: Store<AppState>) {}

  loadProducts(): void {
    this.store.dispatch(getProducts());
  }
}
