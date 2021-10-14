import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
import { ProductModel } from 'src/app/products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  constructor(private readonly dataService: DataService) {}

  getProducts(): Observable<ProductModel[]> {
    return this.dataService.getProducts();
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.getProducts().pipe(
      map((products: ProductModel[]) =>
        products.find((product: ProductModel) => product.id === id)
      )
    );
  }
}
