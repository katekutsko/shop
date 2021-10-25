import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/core';
import { AppSettingsModel } from 'src/app/core/models';
import { SortOptions } from 'src/app/shared';
import { CartItemModel } from '../../models/cart-item.model';
import { CartObservableService } from '../../services/cart-observable.service';

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

  constructor(
    private readonly cartService: CartObservableService,
    private readonly appSettings: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.products$ = this.cartService.getCartItems();
    this.totalItemsAmount$ = this.cartService.getTotalItemsAmount();
    this.totalCost$ = this.cartService.getTotalCost();

    this.appSettings
      .getSettings()
      .pipe(first())
      .subscribe(({ isAsc }: AppSettingsModel) => {
        this.sortOptions = {
          ...this.sortOptions,
          isAsc,
        };
      });
  }

  trackByName(index: number, item: CartItemModel): string {
    return item.id;
  }

  onClear(): void {
    this.products$ = this.cartService.clear();
  }

  onAddOne($event: string): void {
    this.products$ = this.cartService.increaseItemQuantity($event);
  }

  onRemoveOne($event: string): void {
    this.products$ = this.cartService.decreaseItemQuantity($event);
  }

  onRemoveAll($event: string): void {
    this.products$ = this.cartService.deleteCartItem($event);
  }

  onSortFieldToggled(event: any): void {
    const sortField: string = event.target.value;
    this.sortOptions = {
      ...this.sortOptions,
      sortField,
    };
  }
}
