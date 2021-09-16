import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product: ProductModel;

  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();

  constructor() {}

  onClick(): void {
    this.addToCart.emit(this.product);
  }
}
