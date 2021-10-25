import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  Observable,
  throwError,
  catchError,
  retry,
  share,
  concatMap,
  map,
  switchMap,
  forkJoin,
} from 'rxjs';

import { CartItemModel } from '../models/cart-item.model';

@Injectable({
  providedIn: 'any',
})
export class CartObservableService {
  private cartItemsUrl: string = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItemModel[]> {
    return this.http
      .get<CartItemModel[]>(this.cartItemsUrl)
      .pipe(retry(3), share(), catchError(this.handleError));
  }

  getTotalItemsAmount(): Observable<number> {
    return this.getCartItems().pipe(
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
    return this.getCartItems().pipe(
      map((items: CartItemModel[]) =>
        items.reduce(
          (accumulator: number, item: CartItemModel) =>
            accumulator + item.price * item.quantity,
          0
        )
      )
    );
  }

  createCartItem(cartItem: CartItemModel): Observable<CartItemModel> {
    const url = this.cartItemsUrl;

    return this.http
      .post<CartItemModel>(url, cartItem)
      .pipe(catchError(this.handleError));
  }

  deleteCartItem(id: string): Observable<CartItemModel[]> {
    const url = `${this.cartItemsUrl}/${id}`;

    return this.http.delete(url).pipe(
      concatMap(() => this.getCartItems()),
      catchError(this.handleError)
    );
  }

  decreaseItemQuantity(id: string): Observable<CartItemModel[]> {
    return this.getCartItem(id).pipe(
      concatMap((item: CartItemModel) => {
        if (item.quantity > 1) {
          return this.updateCartItem({
            ...item,
            quantity: item.quantity - 1,
          });
        } else {
          return this.deleteCartItem(item.id);
        }
      }),
      concatMap(() => this.getCartItems())
    );
  }

  increaseItemQuantity(id: string): Observable<CartItemModel[]> {
    return this.getCartItem(id).pipe(
      concatMap((item: CartItemModel) => {
        return this.updateCartItem({
          ...item,
          quantity: item.quantity + 1,
        });
      }),
      concatMap(() => this.getCartItems())
    );
  }

  clear(): Observable<CartItemModel[]> {
    return this.getCartItems().pipe(
      switchMap((items) =>
        forkJoin(
          items.map((item) =>
            this.http.delete(`${this.cartItemsUrl}/${item.id}`)
          )
        )
      ),
      concatMap(() => this.getCartItems())
    );
  }

  isEmptyCart(): Observable<boolean> {
    return this.getCartItems().pipe(
      map((items: CartItemModel[]) => items.length === 0)
    );
  }

  getCartItem(id: number | string): Observable<CartItemModel> {
    const url = `${this.cartItemsUrl}/${id}`;

    return this.http
      .get<CartItemModel>(url)
      .pipe(share(), catchError(this.handleError));
  }

  updateCartItem(cartItem: CartItemModel): Observable<CartItemModel> {
    const url = `${this.cartItemsUrl}/${cartItem.id}`;

    return this.http
      .put<CartItemModel>(url, cartItem)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Server error occurred. Error code: ${error.status}; Error message: `,
        error.error
      );
    }

    return throwError(() => new Error('Please try again later.'));
  }
}
