export class Product {
    _id?:string;
    name!: string;
    description!: string;
    sku!: string;
    image!: string;
    labels!: string[];
    price!: number;
    stock!: number;
  }