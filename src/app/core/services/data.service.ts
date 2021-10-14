import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductModel } from 'src/app/products/models/product.model';
import { Category } from 'src/app/shared/enums/category';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private products$: Observable<ProductModel[]> = of([
    {
      id: '1',
      name: 'Trench coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 260,
      category: Category.CLOTHES,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Fur coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 200,
      category: Category.CLOTHES,
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Leather coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 300,
      category: Category.CLOTHES,
      isAvailable: true,
    },
    {
      id: '4',
      name: 'Knitted scarf',
      description:
        'Nulla mattis orci, augue quam maximus nibh, vitae sagittis odio ante at neque.',
      price: 70,
      category: Category.ACCESSORIES,
      isAvailable: false,
    },
    {
      id: '5',
      name: 'Leather boots',
      description: 'Duis pharetra imperdiet eros quis aliquam.',
      price: 70,
      category: Category.SHOES,
      isAvailable: true,
    },
    {
      id: '6',
      name: 'Silk scarf',
      description:
        'Nulla mattis orci, augue quam maximus nibh, vitae sagittis odio ante at neque.',
      price: 70,
      category: Category.ACCESSORIES,
      isAvailable: true,
    },
    {
      id: '7',
      name: 'Leather shoes',
      description: 'Duis pharetra imperdiet eros quis aliquam.',
      price: 340,
      category: Category.SHOES,
      isAvailable: true,
    },
  ]);

  constructor() {}

  getProducts(): Observable<ProductModel[]> {
    return this.products$;
  }
}
