import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
import { CartItemModel } from '../../cart/models/cart-item.model';
import { CartService } from '../../cart/services/cart.service';
import { mapProductToCartItem } from '../mappers/map-product-to-cart-item';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$: Observable<ProductModel[]>;

  constructor(
    private readonly cartService: CartService,
    private readonly dataService: DataService
  ) {
    this.products$ = combineLatest([
      this.dataService.getProducts(),
      this.cartService.getPurchasedItems(),
    ]).pipe(
      map(([products, itemsInCart]: [ProductModel[], CartItemModel[]]) =>
        products.map((product: ProductModel) => ({
          ...product,
          isInCart: Boolean(
            itemsInCart.find((item: CartItemModel) => item.id === product.id)
          ),
        }))
      )
    );
  }

  getProducts(): Observable<ProductModel[]> {
    return this.products$;
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.products$.pipe(
      map((products: ProductModel[]) =>
        products.find((product: ProductModel) => product.id === id)
      )
    );
  }

  addItemToCart(product: ProductModel): void {
    this.cartService.addItemToCart(mapProductToCartItem(product));
  }
}
