import { Injectable } from '@angular/core';
import { CartItemModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  getPurchasedItems(): CartItemModel[] {
    return [
      {
        name: 'Trench coat',
        price: 180,
      },
      {
        name: 'Knitted Scarf',
        price: 70,
      },
      {
        name: 'Leather boots',
        price: 120,
      },
    ];
  }
}
