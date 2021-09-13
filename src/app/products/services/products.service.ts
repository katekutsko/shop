import { Injectable } from '@angular/core';
import { Category } from '../enums/category';
import { ProductModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): ProductModel[] {
    return [
      {
        name: 'Trench coat',
        description: 'Nullam ut enim et tellus tempus hendrerit.',
        price: 180,
        category: Category.CLOTHES,
        isAvailable: true,
      },
      {
        name: 'Knitted scarf',
        description:
          'Nulla mattis orci, augue quam maximus nibh, vitae sagittis odio ante at neque.',
        price: 70,
        category: Category.ACCESSORIES,
        isAvailable: false,
      },
      {
        name: 'Leather boots',
        description: 'Duis pharetra imperdiet eros quis aliquam.',
        price: 180,
        category: Category.SHOES,
        isAvailable: true,
      },
      {
        name: 'Silk scarf',
        description:
          'Nulla mattis orci, augue quam maximus nibh, vitae sagittis odio ante at neque.',
        price: 120,
        category: Category.ACCESSORIES,
        isAvailable: true,
      },
      {
        name: 'Leather shoes',
        description: 'Duis pharetra imperdiet eros quis aliquam.',
        price: 340,
        category: Category.SHOES,
        isAvailable: true,
      },
    ];
  }
}
