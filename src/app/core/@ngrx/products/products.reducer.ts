import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';
import { adapter } from './products.selectors';

const reducer = createReducer(
  initialProductsState,

  on(ProductsActions.getProducts, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, { ...state, loading: false, loaded: true });
  }),
  on(ProductsActions.getProductsError, (state, { error }) => {
    return adapter.setAll([], {
      ...state,
      loading: false,
      loaded: false,
      error,
    });
  })
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
