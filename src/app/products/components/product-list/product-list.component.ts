import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  onAddToCart($event: ProductModel): void {
    this.productsService.addItemToCart($event);
  }
}
