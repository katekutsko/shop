import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: ProductModel;

  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();

  constructor() {}

  onClick(): void {
    this.addToCart.emit(this.product);
  }
}
