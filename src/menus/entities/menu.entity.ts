export class Category {
  index: number;
  title: string;
  description: string;
  products: object[];
}

export class Menu {
  index: number;
  title: string;
  description: string;
  categories: Category[];
}
