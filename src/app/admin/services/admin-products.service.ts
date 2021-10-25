import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  constructor(private readonly dataService: ProductsPromiseService) {}

  getProducts(): Observable<ProductModel[]> {
    return from(this.dataService.getProducts());
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.getProducts().pipe(
      map((products: ProductModel[]) =>
        products.find((product: ProductModel) => product.id === id)
      )
    );
  }
}
