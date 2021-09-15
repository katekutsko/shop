import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItemModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsInCart: CartItemModel[] = [];
  private itemsInCartSubject: Subject<CartItemModel[]> = new BehaviorSubject(
    this.itemsInCart
  );

  constructor() {}

  getPurchasedItems(): Observable<CartItemModel[]> {
    return this.itemsInCartSubject.asObservable();
  }

  addItemToCart(itemToAdd: CartItemModel): void {
    this.itemsInCart.push(itemToAdd);
    this.updateCart();
  }

  private updateCart(): void {
    this.itemsInCartSubject.next(this.itemsInCart);
  }
}
