import { Injectable } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { first, forkJoin, map, Observable, switchMap } from 'rxjs';
import { CartItemModel } from '../../../cart/models';

@Injectable({
  providedIn: 'root',
})
export class CartFacadeService {
  private cartService: EntityCollectionService<CartItemModel>;

  items$: Observable<CartItemModel[]>;
  totalCost$: Observable<number>;
  totalAmount$: Observable<number>;
  loaded$: Observable<boolean>;

  constructor(entityServices: EntityServices) {
    this.cartService = entityServices.getEntityCollectionService('Cart');

    this.items$ = this.cartService.entities$;
    this.totalCost$ = this.items$.pipe(
      map((items: CartItemModel[]) =>
        items.reduce(
          (totalCost: number, currentProduct: CartItemModel) =>
            totalCost + currentProduct.price * currentProduct.quantity,
          0
        )
      )
    );
    this.totalAmount$ = this.items$.pipe(
      map((items: CartItemModel[]) =>
        items.reduce(
          (totalAmount: number, currentProduct: CartItemModel) =>
            totalAmount + currentProduct.quantity,
          0
        )
      )
    );
    this.loaded$ = this.cartService.loaded$;
  }

  loadCart(): void {
    this.cartService.load();
  }

  createCartItem(cartItem: CartItemModel): void {
    this.cartService.add(cartItem);
  }

  deleteCartItem(id: string): void {
    this.cartService.delete(id);
  }

  decreaseItemQuantity(item: CartItemModel): void {
    if (item.quantity > 1) {
      this.cartService.update({
        ...item,
        quantity: item.quantity - 1,
      });
    } else {
      this.cartService.delete(item);
    }
  }

  increaseItemQuantity(item: CartItemModel): void {
    this.cartService.update({
      ...item,
      quantity: item.quantity + 1,
    });
  }

  clear(): void {
    this.cartService.entities$
      .pipe(
        first(),
        switchMap((items) =>
          forkJoin(items.map((item) => this.cartService.delete(item.id)))
        )
      )
      .subscribe();
  }

  isCartNonEmpty(): Observable<boolean> {
    return this.items$.pipe(map((items: CartItemModel[]) => items.length > 0));
  }

  getCartItem(id: number | string): Observable<CartItemModel> {
    return this.cartService.getByKey(id);
  }
}
