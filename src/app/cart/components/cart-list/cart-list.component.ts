import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemModel } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent implements OnInit {
  products$: Observable<CartItemModel[]>;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.products$ = this.cartService.getPurchasedItems();
  }

  trackByName(index: number, item: CartItemModel): string {
    return item.name;
  }

  onClear(): void {
    this.cartService.clear();
  }

  onAddOne($event: string): void {
    this.cartService.increaseItemQuantity($event);
  }

  onRemoveOne($event: string): void {
    this.cartService.decreaseItemQuantity($event);
  }

  onRemoveAll($event: string): void {
    this.cartService.removeItemFromCart($event);
  }
}
