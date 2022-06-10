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
  index: number;
  title: string;
  description: string;
  categories: Category[];
}
