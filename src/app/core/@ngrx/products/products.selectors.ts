import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { AppState } from './../app.state';
import { ProductsState } from './products.state';
import { selectRouterState } from './../router';
import { ProductModel } from './../../../products/models/product.model';

export const selectProductsState = createFeatureSelector<
  AppState,
  ProductsState
>('products');

function selectProductId(product: ProductModel): string {
  return product.id;
}

export const adapter: EntityAdapter<ProductModel> =
  createEntityAdapter<ProductModel>({
    selectId: selectProductId,
  });

export const { selectAll: selectProductsData } =
  adapter.getSelectors(selectProductsState);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);
export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);
export const selectProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): ProductModel => {
    const productID = router.state.params.productID;
    if (productID) {
      return products[productID];
    } else {
      return {
        category: null,
        description: null,
        id: null,
        name: null,
        isAvailable: null,
        price: null,
      };
    }
  }
);
