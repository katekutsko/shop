import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class ProductsPromiseService {
  private productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Promise<ProductModel[]> {
    const request$ = this.http.get(this.productsUrl);
    return firstValueFrom(request$)
      .then((response) => response as ProductModel[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getProduct(id: number | string): Promise<ProductModel> {
    const url = `${this.productsUrl}/${id}`;

    const request$ = this.http.get(url);
    return firstValueFrom(request$)
      .then((response) => response as ProductModel)
      .catch(this.handleError);
  }

  updateProduct(product: ProductModel): Promise<ProductModel> {
    const url = `${this.productsUrl}/${product.id}`;
    const request$ = this.http.put(url, product);

    return firstValueFrom(request$)
      .then((response) => response as ProductModel)
      .catch(this.handleError);
  }

  createProduct(product: ProductModel): Promise<ProductModel> {
    const url = this.productsUrl;

    const request$ = this.http.post(url, product);

    return firstValueFrom(request$)
      .then((response) => response as ProductModel)
      .catch(this.handleError);
  }

  deleteProduct(product: ProductModel): Promise<unknown> {
    const url = `${this.productsUrl}/${product.id}`;
    const request$ = this.http.delete(url);

    return (
      firstValueFrom(request$)
        .catch(this.handleError)
    );
  }
}
