import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import {
  AppSettingsService,
  CartFacadeService,
  AppSettingsModel,
} from '../../../core';
import { SortOptions } from '../../../shared';
import { CartItemModel } from '../../models';

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
    private readonly appSettings: AppSettingsService,
    private readonly cartFacade: CartFacadeService
  ) {}

  ngOnInit(): void {
    this.products$ = this.cartFacade.items$;
    this.totalItemsAmount$ = this.cartFacade.totalAmount$;
    this.totalCost$ = this.cartFacade.totalCost$;

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
    this.cartFacade.clear();
  }

  onAddOne($event: CartItemModel): void {
    this.cartFacade.increaseItemQuantity($event);
  }

  onRemoveOne($event: CartItemModel): void {
    this.cartFacade.decreaseItemQuantity($event);
  }

  onRemoveAll($event: CartItemModel): void {
    this.cartFacade.deleteCartItem($event.id);
  }

  onSortFieldToggled(event: any): void {
    const sortField: string = event.target.value;
    this.sortOptions = {
      ...this.sortOptions,
      sortField,
    };
  }
}
