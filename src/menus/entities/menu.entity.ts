import { Types } from 'mongoose';

export class Product {
  index: number;
  title: string;
  description: string;
  price: number;
}

export class Category {
  index: number;
  title: string;
  description: string;
  products: Product[];
}

export class MenuEntity {
  _id?: Types.ObjectId;
  index: number;
  title: string;
  description: string;
  categories: Category[];
}
