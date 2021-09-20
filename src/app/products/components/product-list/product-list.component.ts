import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
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
    // вижу, вы полюбили использовать combineLatest,
    // почему не withLatestFrom?
    this.products$ = combineLatest([
      this.productsService.getProducts(),
      this.searchString$.pipe(debounceTime(500)),
    ]).pipe(
      map(([products, searchString]: [ProductModel[], string]) =>
        products.filter((product: ProductModel) =>
          Boolean(searchString) // можно попобовать вместо Boolean использовать !!
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
