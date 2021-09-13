import { Component, OnInit } from '@angular/core';
import { CartItemModel } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  products: CartItemModel[];

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getPurchasedItems();
  }

  trackByName(index: number, item: CartItemModel): string {
    return item.name;
  }
}
