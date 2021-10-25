import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CartObservableService } from 'src/app/cart/services/cart-observable.service';
import { CartItemModel } from '../../cart/models/cart-item.model';
import { mapProductToCartItem } from '../mappers/map-product-to-cart-item';
import { ProductModel } from '../models/product.model';
import { ProductsPromiseService } from './products-promise.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private readonly cartService: CartObservableService,
    private readonly dataService: ProductsPromiseService
  ) {}

  getProducts(): Observable<ProductModel[]> {
    return combineLatest([
      this.dataService.getProducts(),
      this.cartService.getCartItems(),
    ]).pipe(
      map(([products, itemsInCart]: [ProductModel[], CartItemModel[]]) =>
        products.map((product: ProductModel) =>
          this.addPurchaseStatus(product, itemsInCart)
        )
      )
    );
  }

  getProductById(id: string): Observable<ProductModel> {
    return combineLatest([
      this.dataService.getProduct(id),
      this.cartService.getCartItems(),
    ]).pipe(
      map(([product, itemsInCart]: [ProductModel, CartItemModel[]]) =>
        this.addPurchaseStatus(product, itemsInCart)
      )
    );
  }

  addItemToCart(product: ProductModel): Observable<ProductModel[]> {
    return this.cartService
      .createCartItem(mapProductToCartItem(product))
      .pipe(concatMap(() => this.getProducts()));
  }

  private addPurchaseStatus(
    product: ProductModel,
    itemsInCart: CartItemModel[]
  ): ProductModel {
    return {
      ...product,
      isInCart: Boolean(
        itemsInCart.find((item: CartItemModel) => item.id === product.id)
      ),
    };
  }
}
