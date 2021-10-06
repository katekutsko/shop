import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItemModel } from '../../cart/models/cart-item.model';
import { CartService } from '../../cart/services/cart.service';
import { Category } from '../enums/category';
import { mapProductToCartItem } from '../mappers/map-product-to-cart-item';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products$: Observable<ProductModel[]> = of([
    {
      name: 'Trench coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 260,
      category: Category.CLOTHES,
      isAvailable: true,
    },
    {
      name: 'Fur coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 200,
      category: Category.CLOTHES,
      isAvailable: true,
    },
    {
      name: 'Leather coat',
      description: 'Nullam ut enim et tellus tempus hendrerit.',
      price: 300,
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
      price: 70,
      category: Category.SHOES,
      isAvailable: true,
    },
    {
      name: 'Silk scarf',
      description:
        'Nulla mattis orci, augue quam maximus nibh, vitae sagittis odio ante at neque.',
      price: 70,
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
  ]);

  constructor(private readonly cartService: CartService) {}

  getProducts(): Observable<ProductModel[]> {
    return combineLatest([
      this.products$,
      this.cartService.getPurchasedItems(),
    ]).pipe(
      map(([products, itemsInCart]: [ProductModel[], CartItemModel[]]) =>
        products.map((product: ProductModel) => ({
          ...product,
          isInCart: Boolean(
            itemsInCart.find(
              (item: CartItemModel) => item.name === product.name
            )
          ),
        }))
      )
    );
  }

  addItemToCart(product: ProductModel): void {
    this.cartService.addItemToCart(mapProductToCartItem(product));
  }
}
