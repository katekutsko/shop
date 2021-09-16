import { Category } from '../enums/category';

export interface ProductModel {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  isInCart?: boolean;
}
