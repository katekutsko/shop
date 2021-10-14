import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortOptions } from 'src/app/shared';
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
  totalItemsAmount$: Observable<number>;
  totalCost$: Observable<number>;

  sortOptions: SortOptions = {
    sortField: null,
    isAsc: false,
  };

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.products$ = this.cartService.getPurchasedItems();
    this.totalItemsAmount$ = this.cartService.getTotalItemsAmount();
    this.totalCost$ = this.cartService.getTotalCost();
  }

  trackByName(index: number, item: CartItemModel): string {
    return item.id;
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

  onSortFieldToggled(event: any): void {
    const sortField: string = event.target.value;
    this.sortOptions = {
      ...this.sortOptions,
      sortField,
    };
  }
}
