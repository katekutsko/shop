import { CartItemModel } from '../../cart/models';
import { ProductModel } from '../models';

export function mapProductToCartItem(product: ProductModel): CartItemModel {
  return {
    name: product.name,
    price: product.price
  };
}
