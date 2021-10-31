import { EntityState } from '@ngrx/entity';
import { ProductModel } from '../../../products/models/product.model';
import { adapter } from './products.selectors';

export interface ProductsState extends EntityState<ProductModel> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

export const initialProductsState: ProductsState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});
