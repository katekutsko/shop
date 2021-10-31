import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsFacadeService, CartFacadeService } from '../../core';
import { CartItemModel } from '../../cart/models/cart-item.model';
import { mapProductToCartItem } from '../mappers/map-product-to-cart-item';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private readonly cartFacade: CartFacadeService,
    private readonly productsFacade: ProductsFacadeService
  ) {}

  loadProducts(): void {
    this.productsFacade.loadProducts();
  }

  getProducts(): Observable<ProductModel[]> {
    return combineLatest([
      this.productsFacade.products$,
      this.cartFacade.items$,
    ]).pipe(
      map(([products, itemsInCart]: [ProductModel[], CartItemModel[]]) =>
        products.map((product: ProductModel) =>
          this.addPurchaseStatus(product, itemsInCart)
        )
      )
    );
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.getProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter((product: ProductModel) => product.id === id);
      }),
      map(
        (productArray: ProductModel[]) =>
          productArray[0] ?? {
            category: null,
            description: null,
            id: null,
            name: null,
            isAvailable: null,
            price: null,
          }
      )
    );
  }

  addItemToCart(product: ProductModel): void {
    this.cartFacade.createCartItem(mapProductToCartItem(product));
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
