import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CartItemModel } from '../../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() item: CartItemModel;

  @Output() addOne: EventEmitter<CartItemModel> = new EventEmitter();
  @Output() removeOne: EventEmitter<CartItemModel> = new EventEmitter();
  @Output() removeAll: EventEmitter<CartItemModel> = new EventEmitter();

  constructor() {}

  onAddOneClick(): void {
    this.addOne.next(this.item);
  }

  onRemoveOneClick(): void {
    this.removeOne.next(this.item);
  }

  onRemoveAllClick(): void {
    this.removeAll.next(this.item);
  }
}
