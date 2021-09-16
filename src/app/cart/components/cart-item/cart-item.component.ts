import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() name: string;
  @Input() price: number;
  @Input() quantity: number;

  @Output() addOne: EventEmitter<string> = new EventEmitter();
  @Output() removeOne: EventEmitter<string> = new EventEmitter();
  @Output() removeAll: EventEmitter<string> = new EventEmitter();

  constructor() {}

  onAddOneClick(): void {
    this.addOne.next(this.name);
  }

  onRemoveOneClick(): void {
    this.removeOne.next(this.name);
  }

  onRemoveAllClick(): void {
    this.removeAll.next(this.name);
  }
}
