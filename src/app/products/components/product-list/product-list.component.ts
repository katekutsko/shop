import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
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

  searchString$: Subject<string> = new BehaviorSubject('');

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.searchString$.pipe(
      debounceTime(500),
      withLatestFrom(this.productsService.getProducts()),
      map(([searchString, products]: [string, ProductModel[]]) =>
        products.filter((product: ProductModel) =>
          !!searchString
            ? product.name.toLowerCase().includes(searchString.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchString.toLowerCase())
            : true
        )
      )
    );
  }

  onAddToCart($event: ProductModel): void {
    this.productsService.addItemToCart($event);
  }
}
