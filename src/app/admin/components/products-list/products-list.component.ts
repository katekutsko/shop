import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/products/models/product.model';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  constructor(private readonly productsService: AdminProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }
}
