import { Category } from '../../shared/enums/category';

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  isInCart?: boolean;
}
