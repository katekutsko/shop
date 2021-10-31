import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AppState, selectProductByUrl, RouterActions } from '../../../core';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  product$: Observable<ProductModel>;

  constructor(
    private readonly productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.product$ = this.store.pipe(
      select(selectProductByUrl),
      tap((product: ProductModel) => {
        if (!product) {
          this.store.dispatch(RouterActions.go({ path: ['/page-not-found'] }));
        }
      })
    );
  }

  addToCart(): void {
    this.product$
      .pipe(first())
      .subscribe((product) => this.productsService.addItemToCart(product));
  }
}
