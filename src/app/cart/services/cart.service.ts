import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private purchasedItems: CartItemModel[] = [];
  private purchasedItemsSubject: Subject<CartItemModel[]> = new BehaviorSubject(
    this.purchasedItems
  );

  constructor() {}

  getPurchasedItems(): Observable<CartItemModel[]> {
    return this.purchasedItemsSubject.asObservable();
  }

  getTotalItemsAmount(): Observable<number> {
    return this.purchasedItemsSubject
      .asObservable()
      .pipe(
        map((items: CartItemModel[]) =>
          items.reduce(
            (accumulator: number, item: CartItemModel) =>
              accumulator + item.quantity,
            0
          )
        )
      );
  }

  getTotalCost(): Observable<number> {
    return this.getPurchasedItems()
      .pipe(
        map((items: CartItemModel[]) =>
          items.reduce(
            (accumulator: number, item: CartItemModel) =>
              accumulator + item.price * item.quantity,
            0
          )
        )
      );
  }

  addItemToCart(item: CartItemModel): void {
    this.purchasedItems = [...this.purchasedItems, item];

    this.updateCart();
  }

  removeItemFromCart(itemName: string): void {
    const itemIndex: number = this.findItemIndexByName(itemName);

    this.removeItem(itemIndex);

    this.updateCart();
  }

  decreaseItemQuantity(itemName: string): void {
    const itemIndex: number = this.findItemIndexByName(itemName);
    const item: CartItemModel = this.purchasedItems[itemIndex];

    if (item.quantity > 1) {
      this.updateItemByIndex(itemIndex, {
        ...item,
        quantity: item.quantity - 1,
      });
    } else {
      this.removeItem(itemIndex);
    }

    this.updateCart();
  }

  increaseItemQuantity(itemName: string): void {
    const itemIndex: number = this.findItemIndexByName(itemName);
    const item: CartItemModel = this.purchasedItems[itemIndex];

    this.updateItemByIndex(itemIndex, {
      ...item,
      quantity: item.quantity + 1,
    });

    this.updateCart();
  }

  clear(): void {
    this.purchasedItems = [];

    this.updateCart();
  }

  isEmptyCart(): boolean {
    return this.purchasedItems.length === 0;
  }

  private findItemIndexByName(itemName: string): number {
    return this.purchasedItems.findIndex(
      (itemInCart: CartItemModel) => itemInCart.name === itemName
    );
  }

  private updateCart(): void {
    this.purchasedItemsSubject.next(this.purchasedItems);
  }

  private removeItem(index: number): void {
    this.purchasedItems = [
      ...this.purchasedItems.slice(0, index),
      ...this.purchasedItems.slice(index + 1),
    ];
  }

  private updateItemByIndex(index: number, item: CartItemModel): void {
    this.purchasedItems = [
      ...this.purchasedItems.slice(0, index),
      item,
      ...this.purchasedItems.slice(index + 1),
    ];
  }
}
