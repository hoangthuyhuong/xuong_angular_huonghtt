import { Bid } from "./Bid";
export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isShow: boolean;
  bids: Bid[];
  startAt: Date;
  endAt: Date;
  bidPriceMax: number;
};

export type ProductAdd = Omit<Product, '_id' | 'bids' | 'bidPriceMax'> & {
  rating: {
    rate: number;
    count: number;
  };
};


export type AddProductForm = {
  title?: string | null,
  price: string | null | undefined;
  description: string | null;
  category: string | null;
  image: string | null;
  isShow: boolean | null;


}
// export type ProductForm = {
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   isShow: boolean;

// };
export interface ProductForm {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isShow: boolean;
  bidTime: string;
  startAt: string;
  endAt: Date; // Add this line
}
export type UpdateProductForm = {
  title?: string | null,
  price: string | null | undefined;
  description: string | null;
  category: string | null;
  image: string | null;
  isShow: boolean | null;
}
