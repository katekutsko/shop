import { CartItemModel } from '../../cart/models/cart-item.model';
import { ProductModel } from '../models/product.model';

export function mapProductToCartItem(product: ProductModel): CartItemModel {
  return {
    name: product.name,
    price: product.price,
    quantity: 1
  };
}
