import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  product$: Observable<ProductModel>;

  constructor(
    private readonly productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return this.productsService.getProductById(paramMap.get('productID'));
      }),
      tap((product: ProductModel) => {
        if (!product) {
          this.router.navigate(['/page-not-found']);
        }
      })
    );
  }

  addToCart(): void {
    this.product$
      .pipe(first())
      .subscribe((product) => this.productsService.addItemToCart(product));
  }
}
