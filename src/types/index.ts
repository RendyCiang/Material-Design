export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  discount: number;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}