// types/product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  category: string;
  images: string[];
  description: string;
}
