import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
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
