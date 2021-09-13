import { Category } from '../enums';

export interface ProductModel {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}
