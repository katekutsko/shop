import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: ProductModel;

  constructor() {}

  onClick(): void {
    console.log('Purchase successful!');
  }
}
